const express = require('express');

const { validateLoginFields } = require('./middlewares');
const { loginController } = require('./controllers');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLoginFields, loginController.post);

module.exports = app;
