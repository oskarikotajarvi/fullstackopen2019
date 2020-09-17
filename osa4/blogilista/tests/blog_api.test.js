const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/list_helper');
const userHelper = require('../utils/user_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

/**
 * A helper function to get authorization token
 */
const addUserAndLogin = async () => {
  const validUser = userHelper.validUser;
  await api.post('/api/users').send(validUser);
  const loginData = await api
    .post('/api/login')
    .send({ username: validUser.username, password: validUser.password });
  return { token: loginData.body.token, username: loginData.body.username };
};

/**
 * Before each test we remove all of the blogs in the
 * database and populate it with new ones
 */
beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

// ***TEST DATABASE WITH SOME BLOGS SAVED***
describe('When there is initially some blogs saved...', () => {
  // Test to see if blog data is returned as JSON
  test('blog info is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  // Get correct number of blogs as a return (returns all)
  test('getting all returns the correct number of blogs (all)', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.blogs.length);
  });

  // Every blog has an ID field
  test('field "id" is defined for all', async () => {
    const response = await api.get('/api/blogs');
    for (let i = 0; i < response.body.length; i++) {
      expect(response.body[i].id).toBeDefined();
    }
  });

  // Test deletion of a blog by id
  test('a single blog can be deleted by id', async () => {
    const userData = await addUserAndLogin();
    const newBlog = helper.singleBlog;
    addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + userData.token)
      .expect(201);
    await api
      .delete(`/api/blogs/${addedBlog.body.id}`)
      .set('Authorization', 'bearer ' + userData.token)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length);
  });

  // Test failing of a deletion if the ID does not exist
  test('deletion of a single blog fails with code 400 if nonexisting id', async () => {
    const userData = await addUserAndLogin();
    const nonValidId = '5a3d5da59070081a82a3445';
    await api
      .delete(`/api/blogs/${nonValidId}`)
      .set('Authorization', 'bearer ' + userData.token)
      .expect(400);
  });

  // Test like amount modificaton
  test('modifying likes on blogs works', async () => {
    const allBlogs = await helper.blogsInDb();
    const blogToModify = allBlogs[0].id;
    const newBlog = { likes: 55 };
    const res = await api
      .put(`/api/blogs/${blogToModify}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toEqual(res.body.likes);
  });

  // Test failing of like modification if ID does not exist
  test('modifying likes on blog fails with code 400 when nonexisting id', async () => {
    const nonValidId = '5a3d5da59070081a82a3445';
    const newBlog = { likes: 56 };
    await api.put(`/api/blogs/${nonValidId}`).send(newBlog).expect(400);
  });
});

// ***TEST ADDING A NEW BLOG***
describe('Addition of a new blog...', () => {
  // Test to see if a valid blog can be added
  test('a valid blog can be added', async () => {
    const userData = await addUserAndLogin();
    const newBlog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + userData.token)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
  });

  //Test to see if status will be 401 if no token is given
  test('if no token is given, response 401 unauthorized', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });

  // Test default like amount to be set at 0
  test('if no likes are defined, likes are 0', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'http://testurl.com'
    };

    const userData = await addUserAndLogin();

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + userData.token)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.likes).toEqual(0);
  });

  // Test failing of adding a blog if there is no title or url defined
  test('fails with status 400 if no title or url defined', async () => {
    const newBlog = { author: 'Test Author' };
    const userData = await addUserAndLogin();
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .set('Authorization', 'bearer ' + userData.token);
  });
});

// After tests are done, close database connection
afterAll(() => {
  mongoose.connection.close();
});
