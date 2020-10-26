import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { votedNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = ({ id, content }) => {
    dispatch(voteAnecdote(id));
    dispatch(votedNotification(content));
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

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote} />
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
