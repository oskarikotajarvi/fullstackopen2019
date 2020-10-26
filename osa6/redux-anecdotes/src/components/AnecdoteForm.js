import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { createdNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = e => {
    clearTimeout();
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    dispatch(createdNotification(e.target.anecdote.value));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>Crate new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
