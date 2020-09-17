const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'uknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(error.message);
  }

  switch (error.name) {
    case 'ValidationError':
      return res.status(400).json({ error: error.message });
    case 'CastError':
      return res.status(400).json({ error: 'Malformed id' });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
  }

  next(error);
};

module.exports = { errorHandler, unknownEndpoint };
