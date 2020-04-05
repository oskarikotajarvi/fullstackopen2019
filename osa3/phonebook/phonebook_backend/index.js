// Live site: https://fos-phonebook.herokuapp.com/
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(res => {
    console.log('Connected to mongoDB');
  })
  .catch(error => {
    console.log('Error while connecting to mongoDB: ' + error.message);
  });

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

//Sends all person data as json
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(doc => {
      res.json(doc.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

// Sends information about the phonebook
app.get('/info', (req, res, next) => {
  Person.find({})
    .then(result => {
      const people = result.length;
      const date = new Date();
      const response = `<p>Phonebook has info of ${people} people.</p><p>${date}</p>`;
      res.send(response);
    })
    .catch(error => next(error));
});

// Gets a single person by id
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// Deletes a person by id
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

// Adds a new person to the prhonebook
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name missing' });
  }
  if (!number) {
    return res.status(400).json({ error: 'Number missing' });
  }

  const person = new Person({
    name: name,
    number: number
  });
  person
    .save()
    .then(doc => {
      return res.status(200).json(doc.toJSON());
    })
    .catch(error => next(error));
});

//Change number of a person
app.put('/api/persons/:id', (req, res, next) => {
  const newPerson = {
    number: req.body.number
  };
  Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
