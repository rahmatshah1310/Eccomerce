const express = require("express");
const router = express.Router();
const productDescController = require("../controllers/descriptionImage.controller");
const { productDescPicUpload } = require("../middlewares/upload.mw");
const { ensureAuthenticated } = require("../middlewares/auth.mw");

router.post("/:productId/description", ensureAuthenticated, productDescPicUpload.array("images", 10), productDescController.addDescriptionImages);
router.get("/:productId/description", ensureAuthenticated, productDescController.getDescriptionImages);
router.delete("/:productId/description/:descriptionId", ensureAuthenticated, productDescController.deleteDescriptionImage);

module.exports = router;
