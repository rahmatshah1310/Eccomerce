const Joi = require("joi");

module.exports.create_product_post = Joi.object({
  categoryName: Joi.string().required(),
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().default(0),
  colorsAvailable: Joi.array().items(Joi.string()).required(),
  sizesAvailable: Joi.array().items(Joi.string()).required(),
  fabrics: Joi.string().allow(""),
  saleName: Joi.string().allow(""),
  order: Joi.number().default(0),
  isActive: Joi.boolean().default(true),
});

module.exports.update_product = Joi.object({
  categoryName: Joi.string().required(),
  productName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).max(100).optional(),
  colorsAvailable: Joi.array().items(Joi.string()).optional(),
  sizesAvailable: Joi.array().items(Joi.string()).optional(),
  fabrics: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
});

module.exports.get_by_category = Joi.object({
  categoryName: Joi.string().required(),
});

module.exports.get_by_size = Joi.object({
  size: Joi.string().required(),
});
