const mongoose = require('mongoose');
const supertest = require('supertest');
const userHelper = require('../utils/user_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

/**
 * Before each test empty the database and populate
 * it with initial users
 */
beforeEach(async () => {
  await User.deleteMany({});
  const newUser = new User(userHelper.initialUser);
  await newUser.save();
});

// ***TESTS WHEN THERE ARE INITIAL USERS IN THE DATABASE***
describe('When there is one initial user saved in db...', () => {
  // Test that user info is returned as JSON
  test('user info is returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  // Test adding a valid user
  test('a new valid user can be added', async () => {
    const usersAtStart = await userHelper.usersInDb();

    await api
      .post('/api/users')
      .send(userHelper.validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await userHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  // Test failing when user name is too short
  test('adding a new user with name too short fails with code 400', async () => {
    await api.post('/api/users').send(userHelper.nameTooShort).expect(400);
  });

  // Test failing when user password is too short
  test('adding a new user with too short password fails with code 400', async () => {
    await api.post('/api/users').send(userHelper.passwordTooShort).expect(400);
  });

  // Test failing when username is already in database
  test('adding user with already existing username in database fails with code 400', async () => {
    await api
      .post('/api/users')
      .send(userHelper.usernameAlreadyInDb)
      .expect(400);
  });

  // Test failing when username and password is missing
  test('adding user with no username and password fails with code 400', async () => {
    await api.post('/api/users').send({ name: 'no fields' }).expect(400);
  });

  // Test failing when username is missing
  test('adding a user with missing username fails with code 400', async () => {
    await api
      .post('/api/users')
      .send({ name: 'no fields', password: '22222' })
      .expect(400);
  });

  // Test failing when password is missing
  test('adding a user with missing password fails with code 400', async () => {
    await api
      .post('/api/users')
      .send({ name: 'no fields', username: 'nofields' })
      .expect(400);
  });
});

// After all tests close database connection
afterAll(() => {
  mongoose.connection.close();
});
