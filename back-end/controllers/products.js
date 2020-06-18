const express = require('express');

const router = express.Router();

const rescue = require('../rescue');

const Products = require('../models/products');

// const verifyJWT = require('../middlewares/verifyJWT')

const callBackAllProducts = (_req, res) =>
  Products.allProducts().then(body => res.status(201).json(body));

router.get('/products', rescue(callBackAllProducts));

module.exports = router;
