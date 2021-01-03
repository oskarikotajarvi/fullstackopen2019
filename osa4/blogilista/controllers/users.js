const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get all users
userRouter.get('/', async (req, res) => {
  const result = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  const users = result.map((user) => user.toJSON());
  res.status(200).json(users);
});

// Get user by id
userRouter.get('/:id', async (req, res) => {
  // const decodedToken = jwt.verify(req.token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return res.status(401).json({ error: 'token missing or invalid' });
  // }
  const user = await User.findById(req.params.id);
  // const user = (await User.findById(req.params.id)).populate('blogs', {
  //   url: 1,
  //   title: 1,
  //   author: 1,
  // });
  return res.status(200).send(user.toJSON());
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
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

module.exports = userRouter;
