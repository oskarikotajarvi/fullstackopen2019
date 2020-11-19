import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = props => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote);
    props.setNotification(`You voted "${props.anecdote.content}"`, 5);
  };

  return (
    <>
      <div>{props.anecdote.content}</div>
      <div>
        has {props.anecdote.votes}
        <button onClick={() => vote(props.anecdote)}>Vote</button>
      </div>
    </>
  );
};

const AnecdoteList = props => {
  //const anecdotes = useSelector(state => state.anecdotes);
  //const filter = useSelector(state => state.filter);

  return (
    <>
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <Anecdote
            anecdote={anecdote}
            voteAnecdote={props.voteAnecdote}
            setNotification={props.setNotification}
          />
        </div>
      ))}
    </>
  );
};

const mapStateToProps = state => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes
    };
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

//export default AnecdoteList;
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
