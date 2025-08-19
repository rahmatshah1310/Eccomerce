const BannerService = require("../services/banner.service");
const joiSchemas = require("../validation/banner.schema");

exports.createBanner = async (req, res) => {
  try {
    const validated = await joiSchemas.create_banner_post.validateAsync(req.body);

    const { path: imageUrl, filename: cloudinaryPublicId } = req.file;

    const banner = await BannerService.createBanner({
      ...validated,
      imageUrl,
      cloudinaryPublicId,
    });

    res.status(201).json({ status: "success", data: banner });
  } catch (err) {
    console.error("BannerConroller [createBanner] Error", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const validated = await joiSchemas.update_banner_post.validateAsync(req.body);

    if (req.file) {
      validated.imageUrl = req.file.path;
      validated.cloudinaryPublicId = req.file.filename;
    }

    const banner = await BannerService.updateBanner(req.params.id, validated);

    res.json({ status: "success", data: banner });
  } catch (err) {
    console.error("BannerController [updateBanner] Error", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getAllBanners = async (req, res) => {
  try {
    const banners = await BannerService.getAllBanners();
    res.json({ status: "success", data: banners });
  } catch (err) {
    console.error("BannerController [getAllBanners] Error:", err);
    res.status(500).json({ status: "error", message: "Failed to fetch banners" });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const banner = await BannerService.getBannerById(req.params.id);
    if (!banner) {
      return res.status(404).json({ status: "error", message: "Banner not found" });
    }
    res.json({ status: "success", data: banner });
  } catch (err) {
    console.error("BannerController [getBannerById] Error:", err);
    res.status(500).json({ status: "error", message: "Failed to fetch banner" });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await BannerService.deleteBanner(req.params.id);
    res.json({ status: "success", message: "Banner deleted" });
  } catch (err) {
    console.error("BannerController [deleteBanner] Error:", err);
    res.status(500).json({ status: "error", message: "Failed to delete banner" });
  }
};

exports.getBannersByDeviceType = async (req, res) => {
  try {
    const { deviceType } = req.params;

    const banners = await BannerService.getBannersByDeviceType(deviceType);

    return res.status(200).json({
      success: true,
      message: "Success",
      data: banners,
    });
  } catch (error) {
    console.error("BannerController [getBannersByDeviceType] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

exports.updateBannerOrder = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const { order } = req.body;

    if (typeof order !== "number") {
      return res.status(400).json({
        success: false,
        message: "`order` must be a number",
      });
    }

    const updatedBanner = await BannerService.updateBannerOrder(bannerId, order);

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner order updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("BannerController [updateBannerOrder] Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.toggleBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;

    const updatedBanner = await BannerService.toggleBannerActiveStatus(bannerId);

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Banner isActive toggled to ${updatedBanner.isActive}`,
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("BannerController [toggleBanner] Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
