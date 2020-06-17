const bodyParser = require('body-parser');
const express = require('express');
const { login } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(login);

module.exports = app;
