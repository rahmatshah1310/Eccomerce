const Banner = require("../model/banner.model");

module.exports.createBanner = async (data) => {
  try {
    return await Banner.create(data);
  } catch (error) {
    console.error("BannerService [createBanner] Error:", error);
    throw new Error("Failed to create banner: " + error.message);
  }
};

module.exports.getAllBanners = async () => {
  try {
    return await Banner.find().sort({ order: 1 });
  } catch (error) {
    console.error("BannerService [getAllBanners] Error:", error);
    throw new Error("Failed to get all banners: " + error.message);
  }
};

module.exports.getBannerById = async (id) => {
  try {
    return await Banner.findById(id);
  } catch (error) {
    console.error("BannerService [getBannerById] Error:", error);
    throw new Error("Failed to get banner by ID: " + error.message);
  }
};

module.exports.updateBanner = async (id, data) => {
  try {
    return await Banner.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error("BannerService [updateBanner] Error:", error);
    throw new Error("Failed to update banner: " + error.message);
  }
};

module.exports.deleteBanner = async (id) => {
  try {
    return await Banner.findByIdAndDelete(id);
  } catch (error) {
    console.error("BannerService [deleteBanner] Error:", error);
    throw new Error("Failed to delete banner: " + error.message);
  }
};

module.exports.getBannersByDeviceType = async (deviceType) => {
  try {
    return await Banner.find({ deviceType });
  } catch (error) {
    console.error("BannerService [getBannersByDeviceType] Error:", error);
    throw new Error("Failed to get banners by device type: " + error.message);
  }
};

module.exports.updateBannerOrder = async (id, order) => {
  try {
    return await Banner.findByIdAndUpdate(id, { order }, { new: true });
  } catch (error) {
    console.error("BannerService [updateBannerOrder] Error:", error);
    throw new Error("Failed to update banner order: " + error.message);
  }
};

module.exports.toggleBannerActiveStatus = async (id) => {
  try {
    const banner = await Banner.findById(id);
    if (!banner) return null;

    banner.isActive = !banner.isActive;
    return await banner.save();
  } catch (error) {
    console.error("BannerService [toggleBannerActiveStatus] Error:", error);
    throw new Error("Failed to toggle banner active status: " + error.message);
  }
};
