import React from 'react';
import { useField, useExcludeResetField } from '../hooks';

const BlogForm = ({ createBlog }) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const create = async e => {
    console.log(title.value);
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    };
    await createBlog(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <form onSubmit={create} id="blogForm">
      <div>
        Title:
        <input id="titleInput" {...useExcludeResetField(title)} />
      </div>
      <div>
        Author:
        <input id="authorInput" {...useExcludeResetField(author)} />
      </div>
      <div>
        URL:
        <input id="urlInput" {...useExcludeResetField(url)} />
      </div>
      <button type="submit" id="blogFormSubmit">
        Create
      </button>
    </form>
  );
};

export default BlogForm;
