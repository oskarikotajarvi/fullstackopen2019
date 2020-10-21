import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const create = async e => {
    e.preventDefault();
    const newBlog = { title: title, author: author, url: url };
    await createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={create} id="blogForm">
      <div>
        Title:
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          id="url"
          title="url"
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id="blogFormSubmit">
        Create
      </button>
    </form>
  );
};

export default BlogForm;
