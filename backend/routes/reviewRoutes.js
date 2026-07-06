const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createReview,
  getReviewsByProduct,
  getTestimonials,
  deleteReview,
} = require("../controllers/reviewController");

// PUBLIC — siapa saja boleh lihat review & testimoni
router.get("/testimonials", getTestimonials);
router.get("/product/:productId", getReviewsByProduct);

// CUSTOMER — wajib login untuk kirim review
router.post("/", authMiddleware, createReview);

// ADMIN ONLY — moderasi/hapus review
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteReview);

module.exports = router;