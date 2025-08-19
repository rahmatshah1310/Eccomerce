const productDescService = require("../services/descimage.service");

module.exports.addDescriptionImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const files = req.files;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId and at least one image are required",
      });
    }
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const images = files.map((file) => ({
      productId,
      imageUrl: file.path,
      cloudinaryPublicId: file.filename,
    }));

    const result = await productDescService.addDescriptionImages(images);

    res.status(201).json({
      success: true,
      message: "Description images uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add description images",
    });
  }
};

const mongoose = require("mongoose");

module.exports.getDescriptionImages = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing productId",
      });
    }

    const result = await productDescService.getDescriptionImages(productId);

    return res.success({
      message: "Description images fetched successfully",
      images: result,
    });
  } catch (err) {
    console.error("DescriptionImageController [getDescriptionImages] Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.deleteDescriptionImage = async (req, res) => {
  try {
    const { productId, descriptionId } = req.params;

    const result = await productDescService.deleteDescriptionImage(productId, descriptionId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Description image not found",
      });
    }

    return res.success({ message: "Description image deleted successfully" }); // ✅ success message in `data`
  } catch (err) {
    console.error("DescriptionImageController [deleteDescriptionImage] Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
