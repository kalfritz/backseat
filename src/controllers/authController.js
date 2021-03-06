const express = require('express');
const routes = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const generateToken = params => {
  return jwt.sign(params, process.env.TOKEN_SECRET, {
    expiresIn: 86400,
  });
};

routes.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });

    const user = await User.create(req.body);

    user.password = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed.' });
  }
});

routes.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(400).send({ error: 'Unable to login' });

    if (!(await bcrypt.compare(password, user.password)))
      return 'Unable to login ';

    user.password = undefined;

    res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Authentication failed.' });
  }
});
module.exports = routes;
