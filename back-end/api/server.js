const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const {  user } = require('./routes');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public', 'images')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(user);

module.exports = app;
