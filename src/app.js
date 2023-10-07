const express = require('express');

const { categoryRouter, postRouter, userRouter } = require('./routers');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send('Api rodando!'));

app.use(userRouter);
app.use(categoryRouter);
app.use(postRouter);

module.exports = app;
