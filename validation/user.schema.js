const Joi = require("joi");

module.exports.local_login_post = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});
