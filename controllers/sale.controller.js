const saleService = require("../services/sale.service");
const { createSaleSchema, updateSaleSchema } = require("../validation/sale.schema");

module.exports.createSale = async (req, res) => {
  try {
    const { error, value } = createSaleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const result = await saleService.createSale(value);
    return res.success({
      message: "Sale created successfully",
      sale: result,
    });
  } catch (err) {
    console.error("SaleController [createSale] Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.createSale = async (req, res) => {
  try {
    const { error, value } = createSaleSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const sale = await saleService.createSale(value);
    return res.success(sale, "Sale created successfully");
  } catch (err) {
    console.error("createSale Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.getAllSales = async (req, res) => {
  try {
    const sales = await saleService.getAllSales();
    return res.success(sales, "All sales fetched successfully");
  } catch (err) {
    console.error("getAllSales Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.getSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await saleService.getSaleById(id);
    if (!sale) return res.status(404).json({ success: false, message: "Sale not found" });

    return res.success(sale, "Sale fetched successfully");
  } catch (err) {
    console.error("getSale Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateSaleSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const updated = await saleService.updateSale(id, value);
    if (!updated) return res.status(404).json({ success: false, message: "Sale not found" });

    return res.success(updated, "Sale updated successfully");
  } catch (err) {
    console.error("updateSale Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await saleService.deleteSale(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Sale not found" });

    return res.success({ message: "Sale deleted successfully" });
  } catch (err) {
    console.error("deleteSale Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.toggleSale = async (req, res) => {
  try {
    const { id } = req.params;
    const toggled = await saleService.toggleSale(id);
    return res.success(toggled, `Sale is now ${toggled.isActive ? "active" : "inactive"}`);
  } catch (err) {
    console.error("toggleSale Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.addProducts = async (req, res) => {
  try {
    const { saleId } = req.params;

    // Validate saleId format
    if (!saleId) {
      return res.status(400).json({ success: false, message: "Invalid saleId format" });
    }

    // Remove duplicate IDs in request (no schema validation)
    const productIds = [...new Set(req.body.productIds || [])];

    const sale = await saleService.addProductsToSale(saleId, productIds);
    return res.status(200).json({ success: true, message: "Products added to sale", data: sale });
  } catch (err) {
    console.error("SaleController [addProducts] Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.removeProducts = async (req, res) => {
  try {
    const { saleId } = req.params;

    // Validate saleId format
    if (!saleId) {
      return res.status(400).json({ success: false, message: "Invalid saleId format" });
    }

    // Remove duplicate IDs (no schema validation)
    const productIds = [...new Set(req.body.productIds || [])];

    const sale = await saleService.removeProductsFromSale(saleId, productIds);
    return res.status(200).json({ success: true, message: "Products removed from sale", data: sale });
  } catch (err) {
    console.error("SaleController [removeProducts] Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.getProductsOnSale = async (req, res) => {
  try {
    const sales = await saleService.getAllProductsOnSale();
    return res.status(200).json({ success: true, message: "Products on sale fetched", data: sales });
  } catch (err) {
    console.error("SaleController [getProductsOnSale] Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports.getSalesStats = async (req, res) => {
  try {
    const stats = await saleService.getSalesStats();
    return res.status(200).json({
      success: true,
      message: "Success",
      data: stats,
    });
  } catch (err) {
    console.error("SaleController [getSalesStats] Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
