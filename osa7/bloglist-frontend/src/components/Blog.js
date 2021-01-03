import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [fullView, setView] = useState(false);

  const user = JSON.parse(window.localStorage.getItem('loggedUser'));
  let hasBlog = false;
  if (user) {
    hasBlog = user.blogs.includes(blog.id);
  }

  const showWhenVisible = { display: fullView ? '' : 'none' };

  const like = (e) => {
    e.preventDefault();
    try {
      dispatch(likeBlog({ id: blog.id, likes: blog.likes }));
    } catch (error) {
      console.error(error);
      dispatch(setNotification('Error while liking the blog...', true, 5));
    }
  };

  const remove = (e) => {
    e.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id));
      } catch (error) {
        console.error(error);
        dispatch(setNotification('Error while removing the blog...', true, 5));
      }
    }
  };

  return (
    <div>
      <div className="blog">
        <span className="title">
          {`${blog.title} - ${blog.author}`}{' '}
          <button onClick={() => setView(!fullView)} className="viewButton">
            {fullView ? 'Hide' : 'View'}
          </button>
        </span>
        <p className="url" style={showWhenVisible}>
          {blog.url}
        </p>
        <div className="likes" style={showWhenVisible}>
          likes {blog.likes}{' '}
          <button onClick={like} className="likeButton">
            Like
          </button>
        </div>
        <p className="username" style={showWhenVisible}>
          {blog.user.name}
        </p>
        {hasBlog && (
          <button
            className="removeButton"
            style={showWhenVisible}
            onClick={remove}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
