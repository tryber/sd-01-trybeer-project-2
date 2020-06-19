const express = require('express');
const rescue = require('../rescue');
const Order = require('../models/order');

const router = express.Router();

const createOrder = async (req, res) => {
  const { street, number, cart_id } = req.body;
  const order = new Order(street, number, cart_id);
  return order.create().then(response => res.status(201).json(response));
};

const allOrders = async (_req, res) => {
  return Order.getAll().then(response => res.status(200).json(response));
}

const userOrders = async (req, res) => {
  const { email } = req.user;
  return Order.getUserOrders(email).then(response => res.status(200).json(response));
}

const orderDetails = async (req, res) => {
  const orderId = req.params.id;
  return Order.getDetails(orderId).then(response => res.status(200).json(response));
}

const updateOrderState = async (req, res) => {
  const orderId = req.params.id;
  return Order.updateState(orderId).then(response => res.status(200).json(response));
}

router.post('/', rescue(createOrder));
router.get('/', rescue(allOrders));
router.get('/user', rescue(userOrders));
router.get('/:id', rescue(orderDetails));
router.put('/:id', rescue(updateOrderState));

module.exports = router;
