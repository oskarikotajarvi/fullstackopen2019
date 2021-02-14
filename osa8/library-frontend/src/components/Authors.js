import React, { useState } from 'react';
import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from '../queries.js';
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-select';

const Authors = (props) => {
  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const result = useQuery(ALL_AUTHORS);
  const [changeBirthyear] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;
  const options = result.data.allAuthors.map((author) => {
    return { value: author.name, label: author.name };
  });

  if (!props.show) {
    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    changeBirthyear({
      variables: {
        name: selectedOption.value,
        setBornTo: Number(born),
      },
    });
    setSelectedOption(null);
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        <Select
          value={selectedOption}
          options={options}
          onChange={setSelectedOption}
        />
        Born{' '}
        <input type="text" onChange={({ target }) => setBorn(target.value)} />
        <br />
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default Authors;
