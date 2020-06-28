const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error.message);
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  } else if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed id' });
  }

  next(error);
};

module.exports = errorHandler;
