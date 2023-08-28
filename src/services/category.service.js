const { Category } = require('../models');

const post = async ({ name }) => {
  const newCategory = await Category.create({ name });
  console.log('Nova categoria: ', newCategory);
  return { status: 'CREATED', data: newCategory };
};

module.exports = {
  post,
};
