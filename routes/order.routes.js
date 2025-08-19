const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { ensureAuthenticated } = require("../middlewares/auth.mw");

router.post("/", ensureAuthenticated, orderController.createOrder);
router.get("/", ensureAuthenticated, orderController.getAllOrders);
router.patch("/:id/status", ensureAuthenticated, orderController.updateOrderStatus);
router.put("/:id", ensureAuthenticated, orderController.updateOrder);
router.get("/:id", ensureAuthenticated, orderController.getOrderById);
router.delete("/:id", ensureAuthenticated, orderController.deleteOrder);

module.exports = router;
