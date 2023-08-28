const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email(),
  password: Joi.string().min(6),
});

module.exports = userSchema;
