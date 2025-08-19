const Joi = require("joi");

exports.create_banner_post = Joi.object({
  heading: Joi.string().max(200).required(),
  description: Joi.string().max(1000).required(),
  deviceType: Joi.string().valid("mobile", "tablet", "laptop").required(),
  isActive: Joi.boolean().optional(),
  order: Joi.number().optional(),
});

exports.update_banner_post = Joi.object({
  heading: Joi.string().max(200).optional(),
  description: Joi.string().max(1000).optional(),
  deviceType: Joi.string().valid("mobile", "tablet", "laptop").optional(),
  isActive: Joi.boolean().optional(),
  order: Joi.number().optional(),
});
