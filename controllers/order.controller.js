const orderSchemas = require("../validation/order.schema");
const OrderService = require("../services/order.service");

module.exports.createOrder = async (req, res) => {
  try {
    const result = await orderSchemas.create_order_post.validateAsync(req.body);

    const order = await OrderService.createOrder(result);

    return res.success(order);
  } catch (error) {
    console.error("OrderController [createOrder] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    return res.success(orders);
  } catch (error) {
    console.error("OrderController [getAllOrders] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    return res.success(order);
  } catch (error) {
    console.error("OrderController [getOrderById] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.updateOrder(id, req.body);
    return res.success(order);
  } catch (error) {
    console.error("OrderController [updateOrder] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.deleteOrder(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.success({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("OrderController [deleteOrder] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await OrderService.updateOrderStatus(id, status);
    return res.success(order);
  } catch (error) {
    console.error("OrderController [updateOrderStatus] Error", error);
    return res.status(500).json({ error: error.message });
  }
};
