const db = require("../config/db");

// Format nama untuk privasi: "Budi Santoso" -> "Budi S."
function formatDisplayName(fullName) {
  if (!fullName) return "Pelanggan";
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
}

// ======================
// CREATE REVIEW
// ======================
exports.createReview = (req, res) => {
  const userId = req.user.id;
  const { order_id, product_id, rating, comment } = req.body;

  if (!order_id || !product_id || !rating) {
    return res.status(400).json({
      message: "order_id, product_id, dan rating wajib diisi",
    });
  }

  const ratingNumber = Number(rating);
  if (!Number.isInteger(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
    return res.status(400).json({
      message: "Rating harus berupa angka bulat antara 1-5",
    });
  }

  db.query(
    `
    SELECT o.id, o.user_id, o.status
    FROM orders o
    JOIN order_items oi ON oi.order_id = o.id
    WHERE o.id = ? AND oi.product_id = ?
    `,
    [order_id, product_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Produk ini tidak ditemukan di dalam pesanan tersebut",
        });
      }

      const order = results[0];

      if (order.user_id !== userId) {
        return res.status(403).json({
          message: "Anda tidak berhak memberi ulasan untuk pesanan ini",
        });
      }

      const validStatus = ["completed", "selesai"];
      if (!validStatus.includes(order.status?.toLowerCase())) {
        return res.status(400).json({
          message: "Ulasan hanya bisa diberikan untuk pesanan yang sudah selesai",
        });
      }

      db.query(
        `
        INSERT INTO reviews (user_id, product_id, order_id, rating, comment)
        VALUES (?, ?, ?, ?, ?)
        `,
        [userId, product_id, order_id, ratingNumber, comment || null],
        (err2, result) => {
          if (err2) {
            if (err2.code === "ER_DUP_ENTRY") {
              return res.status(409).json({
                message: "Anda sudah memberi ulasan untuk produk ini di pesanan tersebut",
              });
            }
            return res.status(500).json({ message: err2.message });
          }

          res.status(201).json({
            message: "Ulasan berhasil dikirim",
            reviewId: result.insertId,
          });
        },
      );
    },
  );
};

// ======================
// GET REVIEWS BY PRODUCT (+ rata-rata rating)
// ======================
exports.getReviewsByProduct = (req, res) => {
  const { productId } = req.params;

  db.query(
    `
    SELECT
      r.id,
      r.rating,
      r.comment,
      r.created_at,
      u.nama AS reviewer_name
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    WHERE r.product_id = ?
    ORDER BY r.created_at DESC
    `,
    [productId],
    (err, reviews) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const totalReviews = reviews.length;
      const averageRating =
        totalReviews > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          : 0;

      const formattedReviews = reviews.map((r) => ({
        ...r,
        reviewer_name: formatDisplayName(r.reviewer_name),
      }));

      res.json({
        average: Number(averageRating.toFixed(1)),
        total: totalReviews,
        reviews: formattedReviews,
      });
    },
  );
};

// ======================
// GET TESTIMONIALS (untuk homepage)
// ======================
exports.getTestimonials = (req, res) => {
  db.query(
    `
    SELECT
      r.rating,
      r.comment,
      u.nama AS reviewer_name,
      p.nama_produk
    FROM reviews r
    JOIN users u ON u.id = r.user_id
    JOIN products p ON p.id = r.product_id
    WHERE r.rating >= 4 AND r.comment IS NOT NULL AND r.comment != ''
    ORDER BY r.created_at DESC
    LIMIT 6
    `,
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const formatted = results.map((r) => ({
        ...r,
        reviewer_name: formatDisplayName(r.reviewer_name),
      }));

      res.json(formatted);
    },
  );
};

// ======================
// DELETE REVIEW (admin only, moderasi)
// ======================
exports.deleteReview = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM reviews WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ulasan tidak ditemukan" });
    }
    res.json({ message: "Ulasan berhasil dihapus" });
  });
};