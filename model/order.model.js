const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  discount: { type: Number, default: 0 },
  finalPrice: { type: Number },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
        address: {
            line1: { type: String, required: true },
            city: { type: String, required: true },
        },
    },
    items: [orderItemSchema],
    courier: {
      name: { type: String },
      trackingNumber: { type: String },
    },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shifted", "cancelled", "delivered", "returned"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
