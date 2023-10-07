const express = require('express');

const {
  validateLoginFields, 
  validateNewUser,
  validateToken,
  validateNewCategory,
  validateNewPost,
  validatePostUpdate,
  validateAuthorization,
} = require('./middlewares');

const {
  loginController,
  userController,
  categoryController,
  postController,
} = require('./controllers');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send('Api rodando!'));

app.post('/login', validateLoginFields, loginController.post);

app.post('/user', validateNewUser, userController.post);

app.use(validateToken);

app.get('/user', userController.getAll);

app.get('/user/:id', userController.getById);

app.post('/categories', validateNewCategory, categoryController.post);

app.get('/categories', categoryController.getAll);

app.post('/post', validateNewPost, postController.post);

app.get('/post', postController.getAll);

app.get('/post/search', postController.getByQuery);

app.get('/post/:id', postController.getById);

app.put('/post/:id', validatePostUpdate, validateAuthorization, postController.update);

app.delete('/post/:id', validateAuthorization, postController.remove);

app.delete('/user/me', userController.removeUser);

module.exports = app;
