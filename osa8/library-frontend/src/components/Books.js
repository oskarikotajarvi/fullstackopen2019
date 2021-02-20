import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, GENRES } from '../queries';

const Books = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const genresResult = useQuery(GENRES);
  const [selectedGenre, setSelectedGenre] = useState('');

  if (!props.show) {
    return null;
  }

  if (booksResult.loading || genresResult.loading) {
    return <div>Loading...</div>;
  }

  const books =
    selectedGenre !== ''
      ? booksResult.data.allBooks.filter((book) =>
          book.genres.includes(selectedGenre)
        )
      : booksResult.data.allBooks;
  const genres = genresResult.data.genres.value;

  return (
    <div>
      <h2>books</h2>

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
      {genres.map((g) => (
        <button key={g} onClick={() => setSelectedGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setSelectedGenre('')}>All</button>
    </div>
  );
};

export default Books;
