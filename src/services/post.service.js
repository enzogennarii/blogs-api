const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const postNotFoundResponseObj = { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
const includeKeyStructure = [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } }];

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
  const posts = await BlogPost.findAll({ include: includeKeyStructure });
  return { status: 'SUCCESSFUL', data: posts };
};

const getById = async (id) => {
  const blogPost = await BlogPost.findOne({ where: { id: Number(id) },
  include: includeKeyStructure });
  if (!blogPost) return postNotFoundResponseObj;
  return { status: 'SUCCESSFUL', data: blogPost };
};

const update = async ({ id, title, content }) => {
  await BlogPost.update({ title, content }, { where: { id: Number(id) } });
  const updatedPost = (await getById(id)).data;
  return { status: 'SUCCESSFUL', data: updatedPost };
};

const remove = async (postId) => {
  const transaction = await sequelize.transaction();
  const results = await Promise.all([
    BlogPost.destroy({ where: { id: Number(postId) }, transaction }),
  ]);
  if (results.some((deletedRows) => !deletedRows)) return postNotFoundResponseObj;
  await transaction.commit();
  return { status: 'NO_CONTENT' };
};

const getByQuery = async (query) => {
  const postsResearched = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${query || ''}%` } },
      { content: { [Op.like]: `%${query || ''}%` } },
    ] },
    include: includeKeyStructure,
  });
  return { status: 'SUCCESSFUL', data: postsResearched };
};

module.exports = { post, getAll, getById, update, remove, getByQuery };
