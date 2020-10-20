import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]); //Set of blogs to show
  const [user, setUser] = useState(null); //User data
  const [notification, setNotification] = useState(null); // Notification message to show user
  const [notificationType, setType] = useState(false); // Is the notification an error or generic message

  const blogFormRef = useRef();

  useEffect(() => {
    async function getBlogs() {
      const res = await blogService.getAll();
      const sorted = res.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(sorted);
    }
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  /**
   * Create a notification
   * @oaram {string} message - Notification message to be shown
   * @param {boolean} error - Wether or not the notification is an error
   */
  const notify = (message, error) => {
    setType(error);
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

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
        notify('Incorrect username of password', true);
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
      const result = await blogService.create({ title, author, url });
      const blogsCopy = blogs.slice();
      blogsCopy[blogsCopy.length + 1] = result;
      setBlogs(blogsCopy);
      notify(`A new blog ${title} by ${author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      console.error(e);
      notify('Something went wrong when adding a blog', true);
    }
  };

  /**
   * Handle a like attempt on a blog
   * @param {Object} blog - Liked blog
   */
  const likeBlog = async blog => {
    try {
      const result = await blogService.like({
        author: blog.author,
        id: blog.id,
        title: blog.title,
        likes: blog.likes,
        url: blog.url
      });

      const updatedBlogs = blogs.slice();
      const index = updatedBlogs.indexOf(blog);
      updatedBlogs[index].likes = result.likes;
      const sortedBlogs = updatedBlogs.sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(sortedBlogs);
    } catch (e) {
      notify('Error while liking the blog..', true);
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
      setBlogs(newBlogs);
    } catch (e) {
      notify('Erro while removing the blog. Please try again.', true);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={notification} error={notificationType} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>Log out</button>
      <Notification message={notification} error={notificationType} />
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
          handleLike={likeBlog}
          handleRemove={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
