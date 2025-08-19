const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/banners", require("./banner.routes"));
router.use("/products", require("./product.routes"));
router.use("/products", require("./descimage.routes"));
router.use("/sales", require("./sale.routes"));
router.use("/orders", require("./order.routes"));

module.exports = router;
