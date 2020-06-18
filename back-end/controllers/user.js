const express = require('express');
const router = express.Router();
const rescue = require('../rescue');

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const secret = 'trybeer';

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) return res.status(422).json({ message: 'Campos vazios!' });
  const user = await User.login({ email, password });
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(user, secret, jwtConfig);
  res.status(200).json({ token });
};

const callBackCreateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User(name, email, password, role);
  return await user.createUser().then(body => {
    res.status(201).json(body);
  });
};

router.post('/user', rescue(callBackCreateUser));

router.post('/login', rescue(login));

module.exports = router;
