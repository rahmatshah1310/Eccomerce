const productSchemas = require("../validation/product.schema");
const ProductService = require("../services/product.service");

module.exports.createProduct = async (req, res) => {
  try {
    const result = await productSchemas.create_product_post.validateAsync(req.body);

    const { path: imageUrl, filename: cloudinaryPublicId } = req.file;

    if (!imageUrl || !cloudinaryPublicId) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const product = await ProductService.addProduct({
      ...result,
      imageUrl,
      cloudinaryPublicId,
    });

    return res.success(product);
  } catch (error) {
    console.error("ProductController [createProduct] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.success(products);
  } catch (error) {
    console.error("ProductController [getAllProducts] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getProductById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    return res.success(product);
  } catch (error) {
    console.error("ProductController [getProductById] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productSchemas.update_product.validateAsync(req.body);

    const updatedProduct = await ProductService.updateProduct(id, result);
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    return res.success(updatedProduct);
  } catch (error) {
    console.error("ProductController [updateProduct] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductService.deleteProduct(id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    return res.success({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("ProductController [deleteProduct] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ProductService.getAllCategories();
    return res.success(categories);
  } catch (error) {
    console.error("ProductController [getAllCategories] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllSizes = async (req, res) => {
  try {
    const sizes = await ProductService.getAllSizes();
    return res.success(sizes);
  } catch (error) {
    console.error("ProductController [getAllSizes] Error", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const products = await ProductService.getProductsByCategory(categoryName);
    return res.success(products);
  } catch (error) {
    console.error("ProductController [getProductByCateogory] Error", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.getProductsBySize = async (req, res) => {
  try {
    const { size } = req.params;

    if (!size) {
      return res.status(400).json({ success: false, message: "Size is required" });
    }

    const products = await ProductService.getProductsBySize(size);
    return res.success(products);
  } catch (error) {
    console.error("ProductController [GetProductsBySize] Error", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
