const db = require("../config/db");
const path = require("path");
// ======================
// CREATE ORDER
// ======================

exports.createOrder = (req, res) => {
  const { customer_name, whatsapp, address, note, payment_method, items } = req.body;
  const user_id = req.user?.id || null;

  if (!customer_name || !whatsapp || !address) {
    return res.status(400).json({
      message: "Nama, WhatsApp dan Alamat wajib diisi",
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Keranjang tidak boleh kosong" });
  }

  const productIds = items.map((item) => item.id);

  // 1. Ambil harga & stok ASLI dari database — jangan pernah percaya angka dari frontend
  db.query(
    `SELECT id, nama_produk, harga, stok FROM products WHERE id IN (?)`,
    [productIds],
    (err, dbProducts) => {
      if (err) return res.status(500).json({ message: err.message });

      if (dbProducts.length !== productIds.length) {
        return res.status(400).json({
          message: "Salah satu produk di keranjang tidak ditemukan",
        });
      }

      // 2. Validasi stok + hitung ulang total_price dari harga ASLI
      let total_price = 0;
      const orderItemsData = [];

      for (const item of items) {
        const productData = dbProducts.find((p) => p.id === item.id);

        if (!item.qty || item.qty <= 0) {
          return res.status(400).json({
            message: `Jumlah pesanan untuk ${productData.nama_produk} tidak valid`,
          });
        }

        if (item.qty > productData.stok) {
          return res.status(400).json({
            message: `Stok ${productData.nama_produk} tidak mencukupi (tersisa ${productData.stok})`,
          });
        }

        total_price += productData.harga * item.qty;
        orderItemsData.push({
          product_id: productData.id,
          qty: item.qty,
          price: productData.harga, // harga ASLI dari database
        });
      }

      // 3. TRANSACTION - semua langkah berhasil atau semua dibatalkan
      db.getConnection((connErr, connection) => {
        if (connErr) return res.status(500).json({ message: connErr.message });

        connection.beginTransaction((txErr) => {
          if (txErr) {
            connection.release();
            return res.status(500).json({ message: txErr.message });
          }

          connection.query(
            `
            INSERT INTO orders
            (customer_name, whatsapp, address, note, payment_method, total_price, user_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [customer_name, whatsapp, address, note, payment_method, total_price, user_id],
            (err2, result) => {
              if (err2) {
                return connection.rollback(() => {
                  connection.release();
                  res.status(500).json({ message: err2.message });
                });
              }

              const orderId = result.insertId;
              const orderItemsValues = orderItemsData.map((item) => [
                orderId,
                item.product_id,
                item.qty,
                item.price,
              ]);

              connection.query(
                `INSERT INTO order_items (order_id, product_id, qty, price) VALUES ?`,
                [orderItemsValues],
                (err3) => {
                  if (err3) {
                    return connection.rollback(() => {
                      connection.release();
                      res.status(500).json({ message: err3.message });
                    });
                  }

                  // 4. Kurangi stok - dijalankan paralel, ditunggu semuanya selesai
                  const stockUpdates = orderItemsData.map(
                    (item) =>
                      new Promise((resolve, reject) => {
                        connection.query(
                          `UPDATE products SET stok = stok - ? WHERE id = ?`,
                          [item.qty, item.product_id],
                          (err4) => (err4 ? reject(err4) : resolve()),
                        );
                      }),
                  );

                  Promise.all(stockUpdates)
                    .then(() => {
                      connection.commit((commitErr) => {
                        if (commitErr) {
                          return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ message: commitErr.message });
                          });
                        }
                        connection.release();
                        res.status(201).json({
                          message: "Pesanan berhasil dibuat",
                          orderId,
                          total_price,
                        });
                      });
                    })
                    .catch((stockErr) => {
                      connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ message: stockErr.message });
                      });
                    });
                },
              );
            },
          );
        });
      });
    },
  );
};

// ======================
// GET ALL ORDERS
// ======================

exports.getOrders = (req, res) => {
  db.query(
    `
    SELECT *
    FROM orders
    ORDER BY created_at DESC
    `,
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      console.log(results);

      res.status(200).json(results);
    },
  );
};

// ======================
// MY ORDERS
// ======================

exports.getMyOrders = (req, res) => {
  const userId = req.user.id;

  db.query(
    `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json(results);
    },
  );
};

// ======================
// UPDATE ORDER STATUS
// ======================

exports.updateOrderStatus = (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  db.query(
    `
    UPDATE orders
    SET status=?
    WHERE id=?
    `,
    [status, id],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Status berhasil diubah",
      });
    },
  );
};

// ======================
// DETAIL ORDER
// ======================

exports.getOrderDetail = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    SELECT
      o.id,
      o.customer_name,
      o.whatsapp,
      o.address,
      o.note,
      o.payment_method,
      o.total_price,
      o.status,
      o.created_at,
      o.payment_proof,
      o.payment_status,

      oi.qty,
      oi.price,

      p.id AS product_id,
      p.nama_produk,
      p.foto,

      r.id AS review_id,
      r.rating AS review_rating,
      r.comment AS review_comment

    FROM orders o

    LEFT JOIN order_items oi
      ON o.id = oi.order_id

    LEFT JOIN products p
      ON oi.product_id = p.id

    LEFT JOIN reviews r
      ON r.order_id = o.id AND r.product_id = p.id

    WHERE o.id = ?
    `,
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Pesanan tidak ditemukan" });
      }

      const order = {
        id: results[0].id,
        customer_name: results[0].customer_name,
        whatsapp: results[0].whatsapp,
        address: results[0].address,
        note: results[0].note,
        payment_method: results[0].payment_method,
        total_price: results[0].total_price,
        status: results[0].status,
        created_at: results[0].created_at,
        payment_proof: results[0].payment_proof,
        payment_status: results[0].payment_status,

        items: results.map((item) => ({
          product_id: item.product_id,
          nama_produk: item.nama_produk,
          qty: item.qty,
          price: item.price,
          foto: item.foto,
          review_id: item.review_id,
          review_rating: item.review_rating,
          review_comment: item.review_comment,
        })),
      };

      res.json(order);
    },
  );
};
// ======================
// MY ORDERS
// ======================

// exports.getMyOrders = (req, res) => {
//   const userId = req.user.id;

//   db.query(
//     `
//     SELECT *
//     FROM orders
//     WHERE user_id = ?
//     ORDER BY created_at DESC
//     `,
//     [userId],
//     (err, results) => {
//       if (err) {
//         return res.status(500).json({
//           message: err.message,
//         });
//       }

//       res.json(results);
//     },
//   );
// };

exports.uploadPaymentProof = (req, res) => {
  console.log("FILE =", req.file);
  console.log("PARAMS =", req.params);
  console.log(req.file);
  const orderId = req.params.id;

  if (!req.file) {
    return res.status(400).json({
      message: "File wajib diupload",
    });
  }

  const paymentProof = `http://localhost:5000/uploads/payments/${req.file.filename}`;

  db.query(
    `
    UPDATE orders
    SET
      payment_proof = ?,
      payment_status = 'Menunggu Verifikasi'
    WHERE id = ?
    `,
    [paymentProof, orderId],
    (err) => {
      if (err) {
        console.log("SQL ERROR =", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Bukti pembayaran berhasil diupload",
      });
    },
  );
};

exports.verifyPayment = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    UPDATE orders
    SET
      payment_status = 'Lunas',
      status = 'confirmed'
    WHERE id = ?
    `,
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Pembayaran berhasil diverifikasi",
      });
    },
  );
};
