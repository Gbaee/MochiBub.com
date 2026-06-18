const db = require("../config/db");
const path = require("path");
// ======================
// CREATE ORDER
// ======================

exports.createOrder = (req, res) => {
  const {
    customer_name,
    whatsapp,
    address,
    note,
    payment_method,
    total_price,
    items,
  } = req.body;

  console.log(items);
  const user_id = req.user?.id || null;

  if (!customer_name || !whatsapp || !address) {
    return res.status(400).json({
      message: "Nama, WhatsApp dan Alamat wajib diisi",
    });
  }

  db.query(
    `
    INSERT INTO orders
    (
      customer_name,
      whatsapp,
      address,
      note,
      payment_method,
      total_price,
      user_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      customer_name,
      whatsapp,
      address,
      note,
      payment_method,
      total_price,
      user_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.message,
        });
      }

      const orderId = result.insertId;

      const orderItems = items.map((item) => [
        orderId,
        item.id,
        item.qty,
        item.harga,
      ]);

      db.query(
        `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          qty,
          price
        )
        VALUES ?
        `,
        [orderItems],
        (err2) => {
          if (err2) {
            console.log(err2);

            return res.status(500).json({
              message: err2.message,
            });
          }

          res.status(201).json({
            message: "Pesanan berhasil dibuat",
            orderId,
          });
        },
      );
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

      p.nama_produk,
      p.foto

    FROM orders o

    LEFT JOIN order_items oi
      ON o.id = oi.order_id

    LEFT JOIN products p
      ON oi.product_id = p.id

    WHERE o.id = ?
    `,
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Pesanan tidak ditemukan",
        });
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
          nama_produk: item.nama_produk,
          qty: item.qty,
          price: item.price,
          foto: item.foto,
        })),
      };

      res.json(order);
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
