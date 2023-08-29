const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
  categoryIds: Joi.array().min(1).required(),
});

module.exports = postSchema;
