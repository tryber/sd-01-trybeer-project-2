const express = require('express');
const jwt = require('jsonwebtoken');
const rescue = require('../rescue');
const Login = require('../models/login');

const router = express.Router();
const secret = 'trybeer';

const generateJWT = (email) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password)
    return res.status(422).json({ message: 'Campos vazios!' });
  const user = await Login(email, password);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });
  const token = generateJWT(email);
  res.status(200).json({ name: user.name, token, email, role: user.admin });
};

router.post('/', rescue(login));

module.exports = router;
