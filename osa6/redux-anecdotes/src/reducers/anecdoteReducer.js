import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => {
        return b.votes - a.votes;
      });

    case 'VOTE_ANECDOTE':
      return state
        .map(anecdote =>
          anecdote.id !== action.data.id ? anecdote : action.data
        )
        .sort((a, b) => {
          return b.votes - a.votes;
        });

    case 'CREATE_ANECDOTE':
      console.log(action.data);
      return [...state, action.data];

    default:
      return state;
  }
};

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteAnecdote({
      ...anecdote,
      votes: (anecdote.votes += 1)
    });
    console.log(updatedAnecdote);
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote
    });
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export default reducer;
