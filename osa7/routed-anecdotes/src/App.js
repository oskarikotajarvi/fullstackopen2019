import React, { useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import About from './components/About';
import Footer from './components/Footer';
import CreateNew from './components/CreateNew';
import Notification from './components/Notification';

const App = () => {
  const [notification, setNotification] = useState('');
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: (Math.random() * 10000).toFixed()
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: (Math.random() * 10000).toFixed()
    }
  ]);

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(a => a.id === String(match.params.id))
    : null;

  let t;
  const notify = message => {
    setNotification(message);
    clearTimeout(t);
    t = setTimeout(() => {
      setNotification('');
    }, 10000);
  };

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    notify(`A new anecdote ${anecdote.content} created!`);
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <Menu />
      <h1>Software anecdotes</h1>
      {notification === '' ? null : <Notification message={notification} />}
      <Switch>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
