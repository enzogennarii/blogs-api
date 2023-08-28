const express = require('express');

const { validateLoginFields, validateNewUser } = require('./middlewares');
const { loginController, userController } = require('./controllers');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLoginFields, loginController.post);

app.post('/user', validateNewUser, userController.post);

module.exports = app;
