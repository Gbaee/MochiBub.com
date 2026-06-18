const express =
  require("express");

const router =
  express.Router();

const {
  getOrders,
} = require(
  "../controllers/adminController"
);

router.get(
  "/orders",
  getOrders
);

module.exports = router;