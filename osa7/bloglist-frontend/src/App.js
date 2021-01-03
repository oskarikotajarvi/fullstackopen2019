import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import User from './components/User';

import { setNotification } from './reducers/notificationReducer';
import { initBlogs, addBlog } from './reducers/blogReducer';
import { initUser, logout } from './reducers/loginReducer';
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

  const blogFormRef = useRef();

  /**
   * Handle a logout
   */
  const handleLogout = () => {
    dispatch(logout());
  };

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
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      console.error(e);
      dispatch(
        setNotification('Something went wrong when adding a blog', true, 5)
      );
    }
  };

  return (
    <>
      <div>
        <h2>Blog App</h2>
      </div>
      <Switch>
        <Route path="/login">
          {user ? (
            <Redirect to="/" />
          ) : (
            <div>
              <h2>Login</h2>
              <Notification />
              <LoginForm />
            </div>
          )}
        </Route>
        <Route path="/users/:id">
          <User user={usr} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user ? (
            <div>
              <button id="logoutButton" onClick={handleLogout}>
                Log out
              </button>
              <Notification />
              <h2>Create new</h2>
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </Togglable>
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
    </>
  );
};

export default App;
