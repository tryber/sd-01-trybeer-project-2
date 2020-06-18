const express = require('express');
const rescue = require('../rescue');
const Products = require('../models/product');
const verifyJWT = require('../middlewares/verifyJWT')

const router = express.Router();

const callBackAllProducts = async (_req, res) =>
  Products.allProducts().then(body => res.status(201).json(body));

router.get('/products', verifyJWT, rescue(callBackAllProducts));

module.exports = router;
