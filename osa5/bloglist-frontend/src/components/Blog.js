import React, { useState } from 'react';

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [fullView, setView] = useState(false);

  const user = JSON.parse(window.localStorage.getItem('loggedUser'));
  let hasBlog = false;
  if (user) {
    hasBlog = user.blogs.includes(blog.id);
  }

  const showFull = fullView ? 'full' : 'hidden';

  const like = async e => {
    e.preventDefault();
    handleLike(blog);
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
          <button onClick={() => setView(!fullView)}>
            {showFull ? 'View' : 'Hide'}
          </button>
        </span>
        <p className={`url ${showFull}`}>{blog.url}</p>
        <span className={`likes ${showFull}`}>
          likes {blog.likes} <button onClick={like}>Like</button>
        </span>
        <p className={`username ${showFull}`}>{blog.user.name}</p>
        {hasBlog && (
          <button className={showFull} onClick={remove}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
