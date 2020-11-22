import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Blog from './Blog';

afterEach(cleanup);

const blog = {
  title: 'Test blog',
  author: 'Test author',
  likes: 0,
  url: 'www.com.com',
  user: {
    username: 'userr222',
    name: 'First User',
    id: 1
  }
};

test('<Blog /> renders title and author, but not url and likes as default', () => {
  const mockLike = jest.fn();
  const mockRemove = jest.fn();

  const component = render(
    <Blog blog={blog} handleLike={mockLike} handleRemove={mockRemove} />
  );

  const title = component.container.querySelector('.title');
  const likes = component.container.querySelector('.likes');
  const url = component.container.querySelector('.url');
  const username = component.container.querySelector('.username');

  expect(title).not.toHaveStyle('display: none');
  expect(title).toHaveTextContent(`${blog.title} - ${blog.author}`);
  expect(likes).toHaveStyle('display: none');
  expect(url).toHaveStyle('display: none');
  expect(username).toHaveStyle('display: none');
});

test('<Blog /> renders the url and likes when the view button has been pressed', () => {
  const mockLike = jest.fn();
  const mockRemove = jest.fn();

  const component = render(
    <Blog blog={blog} handleLike={mockLike} handleRemove={mockRemove} />
  );

  const likes = component.container.querySelector('.likes');
  const url = component.container.querySelector('.url');
  const username = component.container.querySelector('.username');

  expect(likes).toHaveStyle('display: none');
  expect(url).toHaveStyle('display: none');
  expect(username).toHaveStyle('display: none');

  const button = component.container.querySelector('.viewButton');
  fireEvent.click(button);

  expect(likes).not.toHaveStyle('display: none');
  expect(url).not.toHaveStyle('display: none');
  expect(username).not.toHaveStyle('display: none');
});

test('<Blog /> like button pressed twice fires the event twice', () => {
  const mockLike = jest.fn();
  const mockRemove = jest.fn();

  const component = render(
    <Blog blog={blog} handleLike={mockLike} handleRemove={mockRemove} />
  );

  const likeButton = component.container.querySelector('.likeButton');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockLike.mock.calls).toHaveLength(2);
});
