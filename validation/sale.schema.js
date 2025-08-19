const Joi = require("joi");

module.exports.createSaleSchema = Joi.object({
  saleName: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  discountPercentage: Joi.number().min(0).max(100).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
});

module.exports.updateSaleSchema = Joi.object({
  saleName: Joi.string().max(100),
  description: Joi.string().max(500),
  discountPercentage: Joi.number().min(1).max(100),
  startDate: Joi.date(),
  endDate: Joi.date().min(Joi.ref("startDate")),
  isActive: Joi.boolean(),
});
