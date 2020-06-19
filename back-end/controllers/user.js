const express = require('express');
const jwt = require('jsonwebtoken');
const rescue = require('../rescue');
const User = require('../models/user');
const verifyJWT = require('../middlewares/verifyJWT');

const router = express.Router();

const secret = 'trybeer';

const generateJWT = (email) => {
  const jwtConfig = {
    expiresIn: '1m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User(name, email, password, role);
  return await user.createUser().then((_body) => {
    const token = generateJWT(email);
    res.status(200).json({ name, token, email, role });
  });
};

const getOneUser = async (req, res) => {
  const response = req.user;
  return res.status(200).json({ response });
};

const updateUser = async (req, res) => {
  const { name, email, role } = req.user;
  const user = new User(name, email, '', role);
  return user.updateNameUser().then(body => res.status(200).json(body));
};

router.post('/', rescue(createUser));

router.get('/', verifyJWT, rescue(getOneUser));

router.put('/', verifyJWT, rescue(updateUser));

module.exports = router;
