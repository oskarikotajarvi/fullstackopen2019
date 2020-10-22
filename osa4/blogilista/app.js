const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express(); // Initialize express
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const mongoose = require('mongoose');
const errorHandlers = require('./middlewares/errorHandlers');
const tokenExtractor = require('./middlewares/tokenWare');

// Initialize mongoDB connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Express plugins / middlewares
app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

// Routes
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

//If testing, include testing router
if ((process.env.NODE_ENV = 'test')) {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

// Later middlewares
app.use(errorHandlers.errorHandler);
app.use(errorHandlers.unknownEndpoint);

// Export app
module.exports = app;
