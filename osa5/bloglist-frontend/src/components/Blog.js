import React, { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [fullView, setView] = useState(false);

  const showFull = fullView ? '' : 'hidden';

  const toggleView = () => {
    setView(!fullView);
  };

  const like = async e => {
    e.preventDefault();
    handleLike(blog);
  };

  return (
    <div>
      <div className="blog">
        <span>
          {blog.title}{' '}
          <button onClick={toggleView}>{showFull ? 'View' : 'Hide'}</button>
        </span>
        <p className={showFull}>{blog.url}</p>
        <span className={showFull}>
          likes {blog.likes} <button onClick={like}>Like</button>
        </span>
        <p className={showFull}>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
