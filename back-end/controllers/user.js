const express = require('express');
const router = express.Router();
const rescue = require('../rescue');

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'trybeer';

const verifyJWT = require('../middlewares/verifyJWT');

const generateJWT = email => {
  const jwtConfig = {
    expiresIn: '1m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password)
    return res.status(422).json({ message: 'Campos vazios!' });
  const user = await User.login(email, password);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const token = generateJWT(email);
  res.status(200).json({ name: user.name, token, email, role: user.admin });
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User(name, email, password, role);
  return await user.createUser().then(_body => {
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
  const user = new User(name, email, _password, role);
  return user.updateNameUser().then(body => res.status(200).json(body));
};

router.post('/user', rescue(createUser));

router.post('/login', rescue(login));

router.get('/user', verifyJWT, rescue(getOneUser));

router.put('/user', verifyJWT, rescue(updateUser));

module.exports = router;
