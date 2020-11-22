import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import { setNotification } from './reducers/notificationReducer';
import { initBlogs, addBlog, likeBlog } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);

  const [user, setUser] = useState(null); //User data

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  /**
   * Handle a login attempt
   * @param {string} username - The username
   * @param {string} password - The password
   */
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (e) {
      if (e.response.status === 401) {
        dispatch(setNotification('Incorrect username or password', true, 5));
      }
    }
  };

  /**
   * Handle a logout
   */
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  /**
   * Handle the creation of a blog
   * @param {Object} blog - The new blog to be added
   * @param {string} blog.title - The title of the blog
   * @param {string} blog.author - The author of the blog
   * @param {string} blog.url - Url to the blog
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

  /**
   * Handle a like attempt on a blog
   * @param {Object} blog - Liked blog
   */
  const like = (id, likes) => {
    try {
      dispatch(likeBlog(id, likes));
    } catch (e) {
      dispatch(setNotification('Error while liking the blog..', true, 5));
      console.log(e);
    }
  };

  /*
   * Handle the removal of a blog
   * @param {string} id - The id of the blog to remove
   */
  const removeBlog = async id => {
    try {
      await blogService.remove(id);
      const blogsCopy = blogs.slice();
      const newBlogs = blogsCopy.filter(blog => blog.id !== id);
      //setBlogs(newBlogs);
    } catch (e) {
      dispatch(
        setNotification(
          'Erro while removing the blog. Please try again.',
          true,
          5
        )
      );
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in{' '}
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
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={like}
          handleRemove={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
