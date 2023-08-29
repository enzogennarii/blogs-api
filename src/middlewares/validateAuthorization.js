const { postService } = require('../services');

const validateAuthorization = async (req, res, next) => {
  const userTryingToUpdate = req.userId;
  const postId = req.params.id;
  const postToUpdate = (await postService.getById(postId)).data;

  if (postToUpdate.userId !== userTryingToUpdate) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = validateAuthorization;
