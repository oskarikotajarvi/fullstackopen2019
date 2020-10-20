import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('<Blog /> renders title and author, but not url and likes as default', () => {
  const mockLike = jest.fn();
  const mockRemove = jest.fn();
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

  const component = render(
    <Blog blog={blog} handleLike={mockLike} handleRemove={mockRemove} />
  );

  const title = component.container.querySelector('.title');
  const likes = component.container.querySelector('.likes');
  const url = component.container.querySelector('.url');
  const username = component.container.querySelector('.username');

  expect(title).not.toHaveStyle('display: none');
  expect(likes).toHaveStyle('display: none');
  expect(url).toHaveStyle('display: none');
  expect(username).toHaveStyle('display: none');
});

//Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen, authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää.
