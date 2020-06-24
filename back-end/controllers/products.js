const express = require('express');
const rescue = require('../rescue');
const Products = require('../models/products');

const router = express.Router();

const callBackAllProducts = (req, res) => {
  const { email } = req.user;
  return Products.getAllProducts(email).then(body => res.status(201).json(body));
}

const updateCart = async (req, res) => {
  const { email } = req.user;
  const { productName, quantity } = req.body;
  const update = await Products.updateCart(email, productName, quantity);
  return res.status(200).json(update);
}

router.get('/', rescue(callBackAllProducts));

router.post('/', rescue(updateCart));

module.exports = router;
