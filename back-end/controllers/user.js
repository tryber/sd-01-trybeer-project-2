const express = require('express');
const router = express.Router();
const rescue = require('../rescue');

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'trybeer';

const generateJWT = (email) => {
  const jwtConfig = {
    expiresIn: '1m',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
}
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) return res.status(422).json({ message: 'Campos vazios!' });
  const model = new User();
  const user = await model.login(email, password);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const token = generateJWT(email);
  res.status(200).json({ name: user.name, token, email, role: user.admin });
};

const callBackCreateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User(name, email, password, role);
  return await user.createUser().then(_body => {
    const token = generateJWT(email);
    res.status(200).json({ name, token, email, role });
  });
};

router.post('/user', rescue(callBackCreateUser));

router.post('/login', rescue(login));

module.exports = router;
