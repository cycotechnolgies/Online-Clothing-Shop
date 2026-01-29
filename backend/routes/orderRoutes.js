const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  refundOrder,
} = require("../controller/orderController");

const requireAuth = require("../middleware/authMiddleware"); 
const allowRoles = require("../middleware/roleMiddleware");

// 🛒 User creates order
router.post("/", requireAuth, createOrder);

// 🔐 Admin manages orders
router.get("/", requireAuth, allowRoles("Admin"), getOrders);
router.get("/:id", requireAuth, allowRoles("Admin"), getOrderById);
router.put("/:id/status", requireAuth, allowRoles("Admin"), updateOrderStatus);
router.put("/:id/refund", requireAuth, allowRoles("Admin"), refundOrder);

module.exports = router;
 