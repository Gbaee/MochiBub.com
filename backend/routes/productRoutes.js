const express = require("express");
const router = express.Router();
const upload = require(
  "../middlewares/uploadMiddleware"
);
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
  getBestSellerProducts,
} = require("../controllers/productController");

// Statistik Dashboard
router.get("/stats/dashboard", getProductStats);

// Best Seller
router.get("/best-seller", getBestSellerProducts);

// Produk
router.get("/", getProducts);
router.get("/:id", getProductById);

// CRUD
router.post(
  "/",
  upload.single("foto"),
  createProduct
);
router.put(
  "/:id",
  upload.single("foto"),
  updateProduct
);
router.delete("/:id", deleteProduct);

module.exports = router;