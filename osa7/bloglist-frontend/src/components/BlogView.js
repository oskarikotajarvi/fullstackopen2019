import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { likeBlog, commentBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const BlogView = ({ blog }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  if (blog === null || blog === undefined) {
    return null;
  }

  const onComment = (e) => {
    e.preventDefault();
    try {
      dispatch(commentBlog(blog.id, comment));
      setComment('');
    } catch (error) {
      console.error(error);
      dispatch(setNotification('Error while commenting the bog...', true, 5));
    }
  };

  const like = (e) => {
    e.preventDefault();
    try {
      dispatch(likeBlog({ id: blog.id, likes: blog.likes }));
    } catch (error) {
      console.error(error);
      dispatch(setNotification('Error while liking the blog...', true, 5));
    }
  };

  const onCancel = (e) => {
    console.log(comment);
    e.preventDefault();
    setComment('');
  };

  return (
    <Container>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p style={{ marginTop: '1rem' }}>
        Likes: {blog.likes}{' '}
        <Button variant="outline-info" size="sm" onClick={like}>
          <i className="far fa-thumbs-up"></i>
        </Button>
      </p>
      <p>
        Added by: <i>{blog.user.name}</i>
      </p>
      <br />
      <h3>Comments</h3>
      <Form style={{ marginBottom: '1rem' }} onSubmit={onComment}>
        <Form.Group>
          <Form.Label>Add a public comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          style={{ marginRight: '.5rem' }}
          disabled={comment === '' ? true : false}
        >
          Add comment
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Form>
      {blog.comments.map((comment) => (
        <Card
          key={Math.floor(Math.random() * Math.floor(1000000))}
          style={{ marginBottom: '.5rem' }}
        >
          <Card.Body>
            <i>"{comment}"</i>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default BlogView;
