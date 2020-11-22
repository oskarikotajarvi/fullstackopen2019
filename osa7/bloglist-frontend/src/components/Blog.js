import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [fullView, setView] = useState(false);

  const user = JSON.parse(window.localStorage.getItem('loggedUser'));
  let hasBlog = false;
  if (user) {
    hasBlog = user.blogs.includes(blog.id);
  }

  const showWhenVisible = { display: fullView ? '' : 'none' };

  const like = async e => {
    e.preventDefault();
    await handleLike(blog);
  };

  const remove = async e => {
    e.preventDefault();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await handleRemove(blog.id);
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
