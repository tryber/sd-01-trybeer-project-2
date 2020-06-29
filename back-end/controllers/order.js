const express = require('express');
const rescue = require('../rescue');
const Order = require('../models/order');
const Products = require('../models/products');

const router = express.Router();

const createOrder = async (req, res) => {
  const { street, number, cart_id, price, purchase_date: purchaseDate, finished } = req.body;
  const order = new Order(street, number, cart_id, price, purchaseDate, finished);
  return order.create().then(response => res.status(201).json(response));
};

const allOrders = async (_req, res) => Order.getAll().then(body => res.status(200).json(body));

const userOrders = async (req, res) => {
  const { email } = req.user;
  return Order.getUserOrders(email).then(response => res.status(200).json(response));
};

const orderDetails = async (req, res) => {
  const { email } = req.user;
  const orderId = req.params.id;
  const order = await Order.getDetails(orderId);
  const cartProducts = await Products.getCart(email, order.cart_id);
  return res.status(200).json({ ...order, products: cartProducts.data });
};

const updateOrderState = async (req, res) => {
  const orderId = req.params.id;
  return Order.updateState(orderId).then(response => res.status(200).json(response));
};

router.post('/', rescue(createOrder));
router.get('/', rescue(allOrders));
router.get('/user', rescue(userOrders));
router.get('/:id', rescue(orderDetails));
router.put('/:id', rescue(updateOrderState));

module.exports = router;
