const express = require('express');
const rescue = require('../rescue');
const User = require('../models/user');

const router = express.Router();

const callBackCreateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User(name, email, password, role);
  return await user.createUser().then(body => {
    res.status(201).json(body);
  });
};

router.post('/user', rescue(callBackCreateUser));

module.exports = router;
