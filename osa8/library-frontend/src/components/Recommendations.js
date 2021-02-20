import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const Recommendations = ({ show }) => {
  const me = useQuery(ME);
  console.log(me);
  const [books, setBooks] = useState(null);
  const [getBooks, { called, loading, data }] = useLazyQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (me.loading) {
    return <div>Loading...</div>;
  }

  const onClick = () => {
    console.log(me.data.me.favoriteGenre);
    const fetchedBooks = getBooks({ variables: { genre: me.data.me.favoriteGenre } });
    console.log(getBooks({ variables: { genre: me.data.me.favoriteGenre } }));
    setBooks(fetchedBooks);
  };

  const renderBooks = () => {
    if (books) {
      console.log(books);
      return (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      console.log(books);
      return null;
    }
  };

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre</p>
      <button onClick={() => onClick()}>Get recommendations</button>
      {renderBooks()}
    </div>
  );
};

export default Recommendations;
