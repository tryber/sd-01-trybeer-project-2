const express = require('express');

const router = express.Router();

const rescue = require('../rescue');

const Login = require('../models/login');

const jwt = require('jsonwebtoken');

const moment = require('moment');

const callBackDoLogin = async (req, res) => { };

router.post('/login', rescue(callBackDoLogin));

module.exports = router;
