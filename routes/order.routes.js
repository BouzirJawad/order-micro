const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validationRequest");
const { validateOrder } = require("../middlewares/order.validation");
const {
  createOrder,
  getOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");

// ✅ Create order
router.post("/", validateOrder, validateRequest, createOrder);

// ✅ Get all orders
router.get("/", getOrders);

// ✅ Get single order by ID
router.get("/:orderId", getOrderById);

// ✅ Get all orders for a user
router.get("/user/:userId", getUserOrders);

// ✅ Update order status
router.put("/:orderId/status", updateOrderStatus);

// ✅ Delete order
router.delete("/:orderId", deleteOrder);

module.exports = router;
