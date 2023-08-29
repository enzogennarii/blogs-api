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

const getById = async (id) => {
  const postId = Number(id);
  const blogPost = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!blogPost) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: blogPost };
};

const update = async ({ id, title, content }) => {
  const postId = Number(id);
  await BlogPost.update({ title, content }, { where: { id: postId } });
  const updatedPost = (await getById(postId)).data;
  return { status: 'SUCCESSFUL', data: updatedPost };
};

module.exports = {
  post,
  getAll,
  getById,
  update,
};
