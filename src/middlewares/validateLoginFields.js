const loginSchema = require('./schemas/loginSchema');

const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = validateLoginFields;
