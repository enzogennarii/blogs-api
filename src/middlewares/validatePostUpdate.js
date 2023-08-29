const updatePostSchema = require('./schemas/updatePostSchema');

const validatePostUpdate = async (req, res, next) => {
  const { title, content } = req.body;

  const { error } = updatePostSchema.validate({ title, content });
  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = validatePostUpdate;
