import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, act, cleanup } from '@testing-library/react';
import BlogForm from './BlogForm';

afterEach(cleanup);

test('<BlogForm /> fires prop function with correct parameters', async () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  act(() => {
    render(<BlogForm createBlog={createBlog} />);
  });
  const form = component.container.querySelector('form');
  const author = component.container.querySelector('#author');
  const title = component.container.querySelector('#title');
  const url = component.container.querySelector('#url');

  expect(author).toBeDefined();
  expect(form).toBeDefined();
  expect(title).toBeDefined();
  expect(url).toBeDefined();

  fireEvent.change(author, { target: { value: 'Test0' } });
  fireEvent.change(title, { target: { value: 'Test1' } });
  fireEvent.change(url, { target: { value: 'Test2' } });

  await act(async () => {
    fireEvent.submit(form);
  });

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Test1',
    author: 'Test0',
    url: 'Test2'
  });
});
