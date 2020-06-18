const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { user, product, order } = require('./routes');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public', 'images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(user);
app.use(product);
app.use(order)

module.exports = app;
