const db = require("../config/db");

exports.getOrders = (req, res) => {
  db.query(
    `
    SELECT
id,
customer_name,
payment_method,
total_price,
status,
payment_status,
payment_proof,
created_at
FROM orders
    ORDER BY created_at DESC
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

  // ======================
  // RIWAYAT PESANAN USER
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
};
