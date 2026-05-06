const Joi = require('joi');

exports.registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(5).required(),
  role: Joi.string().valid('admin','member','operator').required()
});