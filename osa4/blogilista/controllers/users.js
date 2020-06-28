const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get all users
userRouter.get('/', async (req, res) => {
  const result = await User.find({});
  const users = result.map(user => user.toJSON());
  res.status(200).json(users);
});

// Create a new user
userRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.password) {
    const err = new Error('required field "password" missing');
    err.name = 'ValidationError';
    throw err;
  }

  if (!body.password || body.password.length < 3) {
    const err = new Error('Password needs to be at least 3 characters long');
    err.name = 'ValidationError';
    throw err;
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;
