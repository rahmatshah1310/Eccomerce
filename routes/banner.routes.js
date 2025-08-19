const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner.controller");
const { bannerPicUpload } = require("../middlewares/upload.mw");
const { ensureAuthenticated } = require("../middlewares/auth.mw");

router.post("/", ensureAuthenticated, bannerPicUpload.single("image"), bannerController.createBanner);
router.get("/all", ensureAuthenticated, bannerController.getAllBanners);
router.get("/device/:deviceType", ensureAuthenticated, bannerController.getBannersByDeviceType);
router.put("/order/:id", ensureAuthenticated, bannerController.updateBannerOrder);
router.patch("/toggle/:id", ensureAuthenticated, bannerController.toggleBanner);
router.get("/:id", ensureAuthenticated, bannerController.getBannerById);
router.put("/:id", ensureAuthenticated, bannerPicUpload.single("image"), bannerController.updateBanner);
router.delete("/:id", ensureAuthenticated, bannerController.deleteBanner);

module.exports = router;
