import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useField, useExcludeResetField } from '../hooks';

const BlogForm = ({ createBlog }) => {
  const [open, setOpen] = useState(false);

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const create = async (e) => {
    console.log(title.value);
    e.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    await createBlog(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="create-new-form"
        aria-expanded={open}
      >
        Create New
      </Button>
      <Collapse in={open}>
        <Form
          id="create-new-form"
          style={{ marginTop: '1rem' }}
          onSubmit={create}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title..."
              {...useExcludeResetField(title)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author..."
              {...useExcludeResetField(author)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL..."
              {...useExcludeResetField(url)}
              required
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Collapse>
    </>
  );

  // return (
  //   <form onSubmit={create} id="blogForm">
  //     <div>
  //       Title:
  //       <input id="titleInput" {...useExcludeResetField(title)} required />
  //     </div>
  //     <div>
  //       Author:
  //       <input id="authorInput" {...useExcludeResetField(author)} required />
  //     </div>
  //     <div>
  //       URL:
  //       <input id="urlInput" {...useExcludeResetField(url)} required />
  //     </div>
  //     <button type="submit" id="blogFormSubmit">
  //       Create
  //     </button>
  //   </form>
  // );
};

export default BlogForm;
