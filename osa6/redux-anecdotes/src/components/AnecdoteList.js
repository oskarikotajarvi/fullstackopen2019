import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5));
  };

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>Vote</button>
      </div>
    </>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);

  const anecdotesToShow =
    filter === ''
      ? anecdotes
      : anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <>
      {anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} />
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
