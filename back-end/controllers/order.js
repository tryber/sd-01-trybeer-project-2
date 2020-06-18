const express = require('express');
const rescue = require('../rescue');
const Order = require('../models/order');

const router = express.Router();

const createOrder = async (req, res) => {
  const { street, number, finished, cart_id: cartId } = req.body;
  const order = new Order(street, number, finished, cartId);
  return await order.create().then(body => res.status(201).json(body));
};

router.post('/order', rescue(createOrder));

module.exports = router;
