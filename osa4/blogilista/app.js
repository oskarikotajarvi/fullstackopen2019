const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express(); // Initialize express
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

// Initialize mongoDB connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Express plugins
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);

// Middlewares
app.use(errorHandler);

// Export app
module.exports = app;
