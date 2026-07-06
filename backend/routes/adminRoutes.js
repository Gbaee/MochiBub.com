const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const { getOrders } = require("../controllers/adminController");

router.get("/orders", authMiddleware, authorizeRoles("admin"), getOrders);

module.exports = router;