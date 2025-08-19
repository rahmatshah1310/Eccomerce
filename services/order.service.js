const Product = require("../model/product.model");
const Order = require("../model/order.model");

module.exports.createOrder = async (data) => {
  try {
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of data.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (!product.isActive) {
        throw new Error(`Product ${product.name} is not available`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}. Available: ${product.stock}`);
      }

      const discountAmount = (item.price * item.discount) / 100;
      const finalPrice = (item.price - discountAmount) * item.quantity;

      totalAmount += finalPrice;

      validatedItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
        discount: item.discount,
        finalPrice,
      });

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      ...data,
      items: validatedItems,
      total: totalAmount,
      status: "pending",
    });

    return order;
  } catch (error) {
    console.error("OrderService [createOrder] Error:", error);
    throw new Error("Failed to create order: " + error.message);
  }
};

module.exports.getAllOrders = async () => {
  try {
    const orders = await Order.find().populate("items.productId", "productName price imageUrl").sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    console.error("OrderService [getAllOrders] Error:", error);
    throw new Error("Failed to fetch orders: " + error.message);
  }
};

module.exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.productId", "productName price imageUrl");
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error) {
    console.error("OrderService [getOrderById] Error:", error);
    throw new Error("Failed to fetch order: " + error.message);
  }
};

module.exports.updateOrder = async (orderId, updateData) => {
  try {
    const order = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error) {
    console.error("OrderService [updateOrder] Error:", error);
    throw new Error("Failed to update order: " + error.message);
  }
};

module.exports.deleteOrder = async (orderId) => {
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error) {
    console.error("OrderService [deleteOrder] Error:", error);
    throw new Error("Failed to delete order: " + error.message);
  }
};

module.exports.updateOrderStatus = async (orderId, status) => {
  try {
    const allowedStatuses = ["pending", "shifted", "cancelled", "delivered", "returned"];

    if (!allowedStatuses.includes(status)) {
      throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(", ")}`);
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) throw new Error("Order not found");

    return order;
  } catch (error) {
    console.error("OrderService [updateOrderStatus] Error:", error);
    throw new Error("Failed to update order status: " + error.message);
  }
};
