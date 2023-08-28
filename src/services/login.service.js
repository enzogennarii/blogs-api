const jwt = require('jsonwebtoken');

const { User } = require('../models');

const invalidFieldsResponse = {
  status: 'BAD_REQUEST',
  data: {
    message: 'Invalid fields',
  },
};

const post = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user || user.password !== password) return invalidFieldsResponse;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.displayName,
    },
    process.env.JWT_SECRET,
  );

  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  post,
};