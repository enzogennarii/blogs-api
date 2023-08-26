const express = require('express');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/users', () => console.log('entrou no get'))

module.exports = app;
