const Joi = require("joi");

// Item schema
const orderItemSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required(),
  color: Joi.string().required(),
  size: Joi.string().required(),
  discount: Joi.number().min(0).max(100).default(0),
});

// Full order schema
module.exports.create_order_post = Joi.object({
  customer: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.object({
      line1: Joi.string().required(),
      city: Joi.string().required(),
    }).required(),
  }).required(),

  items: Joi.array().items(orderItemSchema).min(1).required(),

  courier: Joi.object({
    name: Joi.string().required(),
    trackingNumber: Joi.string().required(),
  }).required(),
});
