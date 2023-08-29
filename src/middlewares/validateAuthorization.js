const { postService } = require('../services');

const validateAuthorization = async (req, res, next) => {
  const postId = req.params.id;
  const postInFocus = (await postService.getById(postId)).data;

  if (postInFocus.userId && postInFocus.userId !== req.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = validateAuthorization;
