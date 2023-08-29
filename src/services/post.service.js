const Sequelize = require('sequelize');

const config = require('../config/config');
const { BlogPost, PostCategory, User, Category } = require('../models');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const post = async ({ userId, title, content, categoryIds }) => {
  const transaction = await sequelize.transaction();

  const newPost = await BlogPost.create({ title, content, userId }, { transaction });

  const promises = categoryIds.map((id) => PostCategory.create({
    postId: newPost.id, categoryId: id,
  }, { transaction }));
  await Promise.all(promises);

  await transaction.commit();

  return { status: 'CREATED', data: newPost };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

module.exports = {
  post,
  getAll,
};
