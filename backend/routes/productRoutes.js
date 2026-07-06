const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
  getBestSellerProducts,
} = require("../controllers/productController");

// ===== PUBLIC — semua orang boleh lihat produk (perlu untuk toko online) =====
router.get("/best-seller", getBestSellerProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

// ===== ADMIN ONLY =====
router.get("/stats/dashboard", authMiddleware, authorizeRoles("admin"), getProductStats);

router.post("/", authMiddleware, authorizeRoles("admin"), upload.uploadSingle("foto"), createProduct);
router.put("/:id", authMiddleware, authorizeRoles("admin"), upload.uploadSingle("foto"), updateProduct);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteProduct);

module.exports = router;