const Product = require("../model/product.model");

module.exports.addProduct = async (data) => {
  try {
    return await Product.create(data);
  } catch (error) {
    console.error("ProductService [addProduct] Error:", error);
    throw new Error("Failed to add product: " + error.message);
  }
};

module.exports.getAllProducts = async () => {
  try {
    return await Product.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("ProductService [getAllProducts] Error:", error);
    throw new Error("Failed to fetch products: " + error.message);
  }
};

module.exports.getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    console.error("ProductService [getProductById] Error:", error);
    throw new Error("Failed to fetch product: " + error.message);
  }
};

module.exports.updateProduct = async (id, data) => {
  try {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error("ProductService [updateProduct] Error:", error);
    throw new Error("Failed to update product: " + error.message);
  }
};

module.exports.deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    console.error("ProductService [deleteProduct] Error:", error);
    throw new Error("Failed to delete product: " + error.message);
  }
};

module.exports.getAllCategories = async () => {
  try {
    const categories = await Product.distinct("categoryName");
    return categories;
  } catch (error) {
    console.error("ProductService [getAllCategories] Error:", error);
    throw new Error("Failed to get categories: " + error.message);
  }
};

module.exports.getAllSizes = async () => {
  try {
    const sizes = await Product.distinct("sizesAvailable");
    return sizes;
  } catch (error) {
    console.error("ProductService [getAllSizes] Error:", error);
    throw new Error("Failed to get sizes: " + error.message);
  }
};

module.exports.getProductsByCategory = async (categoryName) => {
  try {
    return await Product.find({ categoryName });
  } catch (error) {
    console.error("ProductService [getProductsByCategory] Error:", error);
    throw new Error("Failed to get products by category: " + error.message);
  }
};

module.exports.getProductsBySize = async (size) => {
  try {
    return await Product.find({ sizesAvailable: size });
  } catch (error) {
    console.error("ProductService [getProductsBySize] Error:", error);
    throw new Error("Failed to get products by size: " + error.message);
  }
};
