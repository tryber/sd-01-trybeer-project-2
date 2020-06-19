const express = require('express');
const rescue = require('../rescue');
const Products = require('../models/products');

const router = express.Router();

const callBackAllProducts = (_req, res) =>
  Products.allProducts().then(body => res.status(201).json(body));

router.get('/', rescue(callBackAllProducts));

module.exports = router;
