const { Category } = require('../models');
const postSchema = require('./schemas/postSchema');

const validateNewPost = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const { error } = postSchema.validate({ title, content, categoryIds });
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const promises = categoryIds.map((id) => Category.findOne({ where: { id } }));
  const results = await Promise.all(promises);
  const isSomeCategoryNotFound = results.some((category) => !category);
  if (isSomeCategoryNotFound) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = validateNewPost;
