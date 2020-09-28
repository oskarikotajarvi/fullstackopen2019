import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]); //Set of blogs to show
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const notify = (message, error) => {
    setType(error);
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      if (e.response.status === 401) {
        notify('Incorrect username of password', true);
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createBlog = async ({ title, author, url }) => {
    try {
      const result = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(result));
      notify(`A new blog ${title} by ${author} added`);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      notify('Something went wrong when adding a blog', true);
    }
  };

  const likeBlog = async blog => {
    try {
      const result = await blogService.like({
        author: blog.author,
        id: blog.id,
        title: blog.title,
        likes: blog.likes,
        url: blog.url
      });

      const index = blogs.indexOf(blog);
      blogs[index].likes = result.likes;
      setBlogs(blogs);
      console.log(blogs[index].likes);
    } catch (e) {
      notify('Error while liking the blog..', true);
      console.log(e);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={notification} error={notificationType} />
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>Log out</button>
      <Notification message={notification} error={notificationType} />
      <h2>Create new</h2>
      {blogForm()}
      <br />
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleLike={likeBlog} />
      ))}
    </div>
  );
};

export default App;
