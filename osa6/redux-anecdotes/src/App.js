import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initAnecdotes } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notifications from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notifications />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
