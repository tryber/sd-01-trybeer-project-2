const express = require('express');
const rescue = require('../rescue');
const Products = require('../models/products');

const router = express.Router();

const callBackAllProducts = (req, res) => {
  const { email } = req.user;
  return Products.getAllProducts(email).then(body => res.status(201).json(body));
}

router.get('/', rescue(callBackAllProducts));

module.exports = router;
