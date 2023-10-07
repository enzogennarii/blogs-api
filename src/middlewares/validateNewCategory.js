const { Category } = require('../models');
const categorySchema = require('./schemas/categorySchema');

const validateNewCategory = async (req, res, next) => {
  const { name } = req.body;

  const { error } = categorySchema.validate({ name });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const categoryAlreadyExists = await Category.findOne({ where: { name } });
  if (categoryAlreadyExists) {
    return res.status(409).json({ message: 'Category already exists' });
  }

  next();
};

module.exports = validateNewCategory;
