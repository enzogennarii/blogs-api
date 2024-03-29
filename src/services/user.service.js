const jwt = require('jsonwebtoken');

const { User, sequelize } = require('../models');

const post = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });
  const token = jwt.sign({
      id: newUser.id,
      name: newUser.displayName,
    }, process.env.JWT_SECRET);
  return { status: 'CREATED', data: { token } };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
};

const getById = async (id) => {
  const userId = Number(id);
  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'User does not exist' },
    };
  }

  return { status: 'SUCCESSFUL', data: user };
};

const removeUser = async (id) => {
  const transaction = await sequelize.transaction();
  await Promise.all([
    User.destroy({ where: { id }, transaction }),
  ]);
  await transaction.commit();

  return { status: 'NO_CONTENT' };
};

module.exports = {
  post,
  getAll,
  getById,
  removeUser,
};
