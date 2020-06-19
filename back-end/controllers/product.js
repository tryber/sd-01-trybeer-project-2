const express = require('express');
const rescue = require('../rescue');
const Product = require('../models/product');

const router = express.Router();

const callBackAllProducts = (_req, res) =>
  Product.allProducts().then(body => res.status(201).json(body));

router.get('/', rescue(callBackAllProducts));

module.exports = router;
