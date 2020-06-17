const bodyParser = require('body-parser');
const express = require('express');
const {  user } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(user);

module.exports = app;
