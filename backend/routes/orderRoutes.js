const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const paymentUpload = require("../middlewares/paymentUploadMiddleware");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderDetail,
  getMyOrders,
  uploadPaymentProof,
  verifyPayment,
} = require("../controllers/orderController");

// CUSTOMER — checkout
router.post("/", authMiddleware, createOrder);

// CUSTOMER — lihat pesanan sendiri
router.get("/my-orders", authMiddleware, getMyOrders);

// CUSTOMER — upload bukti bayar untuk pesanan sendiri
router.post(
  "/:id/upload-payment",
  authMiddleware,
  paymentUpload.uploadSingle("payment"),
  uploadPaymentProof,
);

// ADMIN ONLY — lihat semua pesanan
router.get("/", authMiddleware, authorizeRoles("admin"), getOrders);

// ADMIN ONLY — ubah status pesanan
router.put("/:id/status", authMiddleware, authorizeRoles("admin"), updateOrderStatus);

// ADMIN ONLY — verifikasi pembayaran
router.put("/:id/verify-payment", authMiddleware, authorizeRoles("admin"), verifyPayment);

// Detail 1 pesanan (taruh paling bawah karena pola ":id" generik)
router.get("/:id", authMiddleware, getOrderDetail);

module.exports = router;