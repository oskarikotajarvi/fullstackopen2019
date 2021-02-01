import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import User from './components/User';
import BlogView from './components/BlogView';
import Header from './components/Header';
import Blog from './components/Blog';

import { setNotification } from './reducers/notificationReducer';
import { initBlogs, addBlog } from './reducers/blogReducer';
import { initUser } from './reducers/loginReducer';
import { getAllUsers } from './reducers/usersReducer';

import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const matchUsers = useRouteMatch('/users/:id');
  const matchBlogs = useRouteMatch('/blogs/:id');

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const user = useSelector((state) => state.user);

  const users = useSelector((state) => state.users);

  let usr;
  let blog;

  if (blogs !== null) {
    blog = matchBlogs
      ? blogs.find((blog) => blog.id === matchBlogs.params.id)
      : null;
  }
  if (users !== null) {
    usr = matchUsers
      ? users.find((user) => user.id === matchUsers.params.id)
      : null;
  }

  /**
   * Handle the creation of a blog
   * @param  {string} {title
   * @param  {string} author
   * @param  {string} url}
   */
  const createBlog = async ({ title, author, url }) => {
    try {
      dispatch(addBlog({ title, author, url }));
      dispatch(
        setNotification(`A new blog ${title} by ${author} added`, false, 5)
      );
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification('Something went wrong when adding a blog', true, 5)
      );
    }
  };

  return (
    <>
      <Header user={user} />
      <Container style={{ paddingTop: '5rem' }}>
        <Switch>
          <Route exact path="/login">
            {user ? (
              <Redirect to="/" />
            ) : (
              <div>
                <Notification />
                <LoginForm />
              </div>
            )}
          </Route>

          <Route path="/users/:id">
            <User user={usr} />
          </Route>

          <Route exact path="/users">
            <Users />
          </Route>

          <Route path="/blogs/:id">
            <BlogView blog={blog} />
          </Route>

          <Route exact path="/">
            {user ? (
              <div>
                <Notification />
                <h1>Blogs</h1>
                <h4>Create new</h4>
                <BlogForm createBlog={createBlog} />
                <br />
                <br />
                {blogs.map((blog) => (
                  <Blog key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
