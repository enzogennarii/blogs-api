const { User } = require('../database/models');
const userSchema = require('./schemas/userSchema');

const validateNewUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;

  const { error } = userSchema.validate({ displayName, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const userAlreadyExists = await User.findOne({ where: { email } });
  if (userAlreadyExists) {
    return res.status(409).json({ message: 'User already registered' });
  }

  next();
};

module.exports = validateNewUser;
