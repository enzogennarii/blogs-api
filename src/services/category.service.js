const { Category } = require('../database/models');

const post = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return { status: 'CREATED', data: newCategory };
};

const getAll = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  post,
  getAll,
};
