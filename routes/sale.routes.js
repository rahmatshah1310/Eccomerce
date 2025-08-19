const express = require("express");
const router = express.Router();
const saleController = require("../controllers/sale.controller");
const { ensureAuthenticated } = require("../middlewares/auth.mw");

router.post("/", ensureAuthenticated, saleController.createSale);
router.get("/all", ensureAuthenticated, saleController.getAllSales);
router.get("/products", ensureAuthenticated, saleController.getProductsOnSale);
router.get("/stats", ensureAuthenticated, saleController.getSalesStats);
router.put("/:id", ensureAuthenticated, saleController.updateSale);
router.get("/:id", ensureAuthenticated, saleController.getSale);
router.delete("/:id", ensureAuthenticated, saleController.deleteSale);
router.patch("/toggle/:id", ensureAuthenticated, saleController.toggleSale);
router.post("/:saleId/products", ensureAuthenticated, saleController.addProducts);
router.delete("/:saleId/products", ensureAuthenticated, saleController.removeProducts);

module.exports = router;
