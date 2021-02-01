import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const Blog = ({ blog }) => {
  return (
    <Card>
      <Card.Body>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Card.Body>
    </Card>
  );
};

export default Blog;
