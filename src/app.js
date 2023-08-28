const express = require('express');

const { validateLoginFields, validateNewUser, validateToken } = require('./middlewares');
const { loginController, userController } = require('./controllers');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send());

// Requisito 3
app.post('/login', validateLoginFields, loginController.post);

// Requisito 4
app.post('/user', validateNewUser, userController.post);

// Middleware de validação de Token
app.use(validateToken);

// Requisito 5
app.get('/user', userController.getAll);

// Requisito 6
// app.metodo('', );

// Requisito 8
// app.metodo('', );

// Requisito 9
// app.metodo('', );

// Requisito 12
// app.metodo('', );

// Requisito 13
// app.metodo('', );

// Requisito 14
// app.metodo('', );

// Requisito 15
// app.metodo('', );

// Requisito 16
// app.metodo('', );

// Requisito 17
// app.metodo('', );

// Requisito 18
// app.metodo('', );

module.exports = app;
