const { Router } = require('express');

const {
  validateToken,
  validateAuthorization,
  validateNewPost,
  validatePostUpdate,
} = require('../middlewares');

const { postController } = require('../controllers');

const postRouter = Router();

postRouter.use(validateToken);

postRouter.get('/post', postController.getAll);

postRouter.get('/post/search', postController.getByQuery);

postRouter.get('/post/:id', postController.getById);

postRouter.post('/post', validateNewPost, postController.post);

postRouter.put('/post/:id', validatePostUpdate, validateAuthorization, postController.update);

postRouter.delete('/post/:id', validateAuthorization, postController.remove);

module.exports = postRouter;
