import React from 'react';
import { useField, useExcludeResetField } from '../hooks';
import { useHistory } from 'react-router-dom';

const CreateNew = props => {
  const history = useHistory();

  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = e => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    history.push('/');
  };

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...useExcludeResetField(content)} />
        </div>
        <div>
          author
          <input {...useExcludeResetField(author)} />
        </div>
        <div>
          url for more info
          <input {...useExcludeResetField(info)} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
