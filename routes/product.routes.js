const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { productPicUpload } = require("../middlewares/upload.mw");
const { ensureAuthenticated } = require("../middlewares/auth.mw");

router.post("/", ensureAuthenticated, productPicUpload.single("image"), productController.createProduct);
router.get("/all", ensureAuthenticated, productController.getAllProducts);
router.get("/categories", ensureAuthenticated, productController.getAllCategories);
router.get("/sizes", ensureAuthenticated, productController.getAllSizes);
router.get("/category/:categoryName", ensureAuthenticated, productController.getProductsByCategory);
router.get("/size/:size", ensureAuthenticated, productController.getProductsBySize);
router.get("/:id", ensureAuthenticated, productController.getProductById);
router.put("/:id", ensureAuthenticated, productPicUpload.single("image"), productController.updateProduct);
router.delete("/:id", ensureAuthenticated, productController.deleteProduct);

module.exports = router;
