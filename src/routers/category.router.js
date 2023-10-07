const { Router } = require('express');

const { categoryController } = require('../controllers');
const { validateNewCategory, validateToken } = require('../middlewares');

const categoryRouter = Router();

categoryRouter.use(validateToken);

categoryRouter.get('/categories', categoryController.getAll);

categoryRouter.post('/categories', validateNewCategory, categoryController.post);

module.exports = categoryRouter;
