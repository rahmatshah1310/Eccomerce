const ProductDescriptionImage = require("../model/descriptionImage.model");

module.exports.addDescriptionImages = async (images) => {
  try {
    const result = await ProductDescriptionImage.insertMany(images);
    return result;
  } catch (error) {
    console.error("ProductDescriptionImageService [addDescriptionImages] Error:", error);
    throw new Error("Failed to add description images");
  }
};

module.exports.getDescriptionImages = async (productId) => {
  try {
    return await ProductDescriptionImage.find({ productId });
  } catch (error) {
    console.error("ProductDescriptionImageService [getDescriptionImages] Error:", error);
    throw new Error("Failed to fetch description images: " + error.message);
  }
};

module.exports.deleteDescriptionImage = async (productId, descriptionId) => {
  try {
    return await ProductDescriptionImage.findOneAndDelete({ productId, _id: descriptionId });
  } catch (error) {
    console.error("ProductDescriptionImageService [deleteDescriptionImage] Error:", error);
    throw new Error("Failed to delete description image: " + error.message);
  }
};
