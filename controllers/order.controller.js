const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders to display" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId: userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  try {
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const allowedStatuses = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "canceled",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    order.status = status;
    await order.save();

    res.status(201).json({ message: "Order status updated", order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(201).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
