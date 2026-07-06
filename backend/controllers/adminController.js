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
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    },
  );
};