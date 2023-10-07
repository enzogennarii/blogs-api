const { Router } = require('express');

const {
  validateLoginFields,
  validateNewUser,
  validateToken,
} = require('../middlewares');

const { loginController, userController } = require('../controllers');

const userRouter = Router();

userRouter.post('/user', validateNewUser, userController.post);

userRouter.post('/login', validateLoginFields, loginController.post);

userRouter.use(validateToken);

userRouter.get('/user', userController.getAll);

userRouter.get('/user/:id', userController.getById);

userRouter.delete('/user/me', userController.removeUser);

module.exports = userRouter;
