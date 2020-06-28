const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Get all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Create a new blog
blogsRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.status(201).send(result.toJSON());
});

// Remove a blog by id
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

// Update a blog like amount
blogsRouter.put('/:id', async (req, res) => {
  const blog = { likes: req.body.likes };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true
  });
  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
