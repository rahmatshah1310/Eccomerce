const Sale = require("../model/sale.model");
const Product = require("../model/product.model");

module.exports.createSale = async (saleData) => {
  try {
    const sale = new Sale(saleData);
    return await sale.save();
  } catch (error) {
    console.error("SaleService [createSale] Error:", error);
    throw new Error("Failed to create sale: " + error.message);
  }
};

// Create a new sale
module.exports.createSale = async (data) => {
  try {
    const sale = await Sale.create(data);
    return sale;
  } catch (error) {
    console.error("SaleService [createSale] Error:", error);
    throw new Error("Failed to create sale");
  }
};

// Get all sales
module.exports.getAllSales = async () => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    return sales;
  } catch (error) {
    console.error("SaleService [getAllSales] Error:", error);
    throw new Error("Failed to fetch sales");
  }
};

// Get single sale by ID
module.exports.getSaleById = async (id) => {
  try {
    const sale = await Sale.findById(id);
    return sale;
  } catch (error) {
    console.error("SaleService [getSaleById] Error:", error);
    throw new Error("Failed to fetch sale");
  }
};

// Update sale by ID
module.exports.updateSale = async (id, data) => {
  try {
    const updated = await Sale.findByIdAndUpdate(id, data, { new: true });
    return updated;
  } catch (error) {
    console.error("SaleService [updateSale] Error:", error);
    throw new Error("Failed to update sale");
  }
};

// Delete sale by ID
module.exports.deleteSale = async (id) => {
  try {
    const deleted = await Sale.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.error("SaleService [deleteSale] Error:", error);
    throw new Error("Failed to delete sale");
  }
};

// Toggle sale active status
module.exports.toggleSale = async (id) => {
  try {
    const sale = await Sale.findById(id);
    if (!sale) throw new Error("Sale not found");
    sale.isActive = !sale.isActive;
    return await sale.save();
  } catch (error) {
    console.error("SaleService [toggleSale] Error:", error);
    throw new Error("Failed to toggle sale status");
  }
};

module.exports.addProductsToSale = async (saleId, productIds) => {
  try {
    const sale = await Sale.findById(saleId);
    if (!sale) throw new Error("Sale not found");

    // Validate all product IDs exist
    const existingProducts = await Product.find({ _id: { $in: productIds } }).select("_id");
    const foundIds = existingProducts.map((p) => p._id.toString());
    const missingIds = productIds.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new Error(`Invalid product IDs: ${missingIds.join(", ")}`);
    }

    // Merge and remove duplicates
    const updatedProductIds = [...new Set([...sale.products.map((id) => id.toString()), ...productIds])];

    sale.products = updatedProductIds;
    return await sale.save();
  } catch (error) {
    console.error("SaleService [addProductsToSale] Error:", error);
    throw new Error(error.message || "Failed to add products to sale");
  }
};

module.exports.removeProductsFromSale = async (saleId, productIds) => {
  try {
    const sale = await Sale.findById(saleId);
    if (!sale) throw new Error("Sale not found");

    // Filter out the given product IDs
    sale.products = sale.products.filter((id) => !productIds.includes(id.toString()));

    return await sale.save();
  } catch (error) {
    console.error("SaleService [removeProductsFromSale] Error:", error);
    throw new Error(error.message || "Failed to remove products from sale");
  }
};

module.exports.getAllProductsOnSale = async () => {
  try {
    const sales = await Sale.find({ isActive: true }).populate("products").sort({ createdAt: -1 });

    return sales;
  } catch (error) {
    console.error("SaleService [getAllProductsOnSale] Error:", error);
    throw new Error("Failed to fetch products on sale");
  }
};

module.exports.getSalesStats = async () => {
  try {
    const sales = await Sale.find();

    const totalSales = sales.length;
    const activeSales = sales.filter((sale) => sale.isActive).length;
    const totalProductsOnSale = sales.reduce((sum, sale) => sum + (sale.products?.length || 0), 0);

    const avgDiscount = totalSales > 0 ? sales.reduce((sum, sale) => sum + (sale.discountPercentage || 0), 0) / totalSales : 0;

    return {
      _id: null,
      totalSales,
      activeSales,
      totalProductsOnSale,
      avgDiscount,
    };
  } catch (err) {
    console.error("SaleService [getSalesStats] Error:", err);
    throw new Error("Failed to fetch sales statistics");
  }
};
