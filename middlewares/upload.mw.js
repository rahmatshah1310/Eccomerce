// middlewares/upload.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config");
const path = require("path");

const bannerPicUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const userEmail = req.user?.email || "default";
      return {
        folder: `ecommerce-backend/${userEmail}/banner-pic`,
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 500, height: 500, crop: "fill" }],
      };
    },
  }),
});

const productPicUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const userEmail = req.user?.email || "default";
      return {
        folder: `ecommerce-backend/${userEmail}/product-pic`,
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      };
    },
  }),
});

const productDescPicUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      const userEmail = req.user?.email || "default";
      return {
        folder: `ecommerce-backend/${userEmail}/product-desc-pic`,
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      };
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: function (req, file, cb) {
    const allowed = /jpeg|jpg|png|webp/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
  },
});

module.exports = { bannerPicUpload, productPicUpload, productDescPicUpload };
