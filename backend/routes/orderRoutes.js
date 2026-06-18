const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const paymentUpload = require(
  "../middlewares/paymentUploadMiddleware"
);

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderDetail,
  getMyOrders,
  uploadPaymentProof,
  verifyPayment,
} = require("../controllers/orderController");

// CUSTOMER CHECKOUT
router.post(
  "/",
  authMiddleware,
  createOrder
);

// ADMIN
router.get(
  "/",
  authMiddleware,
  getOrders
);

// MY ORDERS
router.get(
  "/my-orders",
  authMiddleware,
  getMyOrders
);

// DETAIL ORDER
router.get(
  "/:id",
  authMiddleware,
  getOrderDetail
);

// UPLOAD BUKTI PEMBAYARAN
router.post(
  "/:id/upload-payment",
  authMiddleware,
  paymentUpload.single("payment"),
  uploadPaymentProof
);

// UPDATE STATUS
router.put(
  "/:id/status",
  authMiddleware,
  updateOrderStatus
);

// VERIFY PAYMENT
router.put(
  "/:id/verify-payment",
  authMiddleware,
  verifyPayment
);

module.exports = router;