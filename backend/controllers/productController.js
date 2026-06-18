const db = require("../config/db");

// GET semua produk
exports.getProducts = (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.status(200).json(results);
  });
};

// GET produk berdasarkan ID
exports.getProductById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json(results[0]);
  });
};

// POST tambah produk
exports.createProduct = (req, res) => {
  const { nama_produk, harga, stok, deskripsi } = req.body;

  const foto = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";

  db.query(
    `INSERT INTO products
    (nama_produk,harga,stok,deskripsi,foto)
    VALUES (?,?,?,?,?)`,
    [nama_produk, harga, stok, deskripsi, foto],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.status(201).json({
        message: "Produk berhasil ditambahkan",
      });
    },
  );
};

// UPDATE produk
exports.updateProduct = (req, res) => {
  const { id } = req.params;

  const { nama_produk, harga, stok, deskripsi } = req.body;

  const foto = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : req.body.foto;

  db.query(
    `UPDATE products
     SET nama_produk=?,
         harga=?,
         stok=?,
         deskripsi=?,
         foto=?
     WHERE id=?`,
    [nama_produk, harga, stok, deskripsi, foto, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Produk berhasil diupdate",
      });
    },
  );
};

// DELETE produk
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    res.json({
      message: "Produk berhasil dihapus",
    });
  });
};

// ======================
// PRODUCT STATS
// ======================

exports.getProductStats = (req, res) => {
  db.query(
    `
    SELECT
      COUNT(*) AS totalProducts,
      SUM(CASE WHEN stok <= 5 THEN 1 ELSE 0 END) AS lowStockProducts
    FROM products
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json(result[0]);
    },
  );
};

// ======================
// BEST SELLER PRODUCTS
// ======================

exports.getBestSellerProducts = (req, res) => {
  db.query(
    `
    SELECT
      p.*,
      COALESCE(SUM(oi.qty),0) AS total_sold
    FROM products p
    LEFT JOIN order_items oi
      ON p.id = oi.product_id
    GROUP BY p.id
    ORDER BY total_sold DESC
    LIMIT 3
    `,
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
