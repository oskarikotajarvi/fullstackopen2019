const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

// Create a new blog
blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  const returnBlog = await Blog.findById(result._id).populate('user', {
    username: 1,
    name: 1,
  });
  res.status(201).send(returnBlog.toJSON());
});

// Remove a blog by id
blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete.user.toString() !== decodedToken.id.toString()) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

// Update a blog like amount
blogsRouter.put('/:id', async (req, res) => {
  const blog = { likes: req.body.likes };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
