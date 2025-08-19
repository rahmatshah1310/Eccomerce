const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    colorsAvailable: [String],
    sizesAvailable: [String],
    fabrics: String,
    saleName: { type: String, default: "" },
    totalRating: { type: Number, default: 0 },
    imageUrl: { type: String, required: true },
    cloudinaryPublicId: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
