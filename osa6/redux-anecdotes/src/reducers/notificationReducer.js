const initialState = null;

const reducer = (state = initialState, action) => {
  console.log('notification state now: ', state);
  console.log('notification action', action);

  switch (action.type) {
    case 'ANECDOTE_VOTE_NOTIFICATION':
      return `You voted "${action.content}"`;

    case 'ANECDOTE_CREATED_NOTIFICATION':
      return `Anecdote "${action.content}" created`;

    case 'RESET_NOTIFICATION':
      return null;

    default:
      return state;
  }
};

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  };
};

export const votedNotification = content => {
  return {
    type: 'ANECDOTE_VOTE_NOTIFICATION',
    content
  };
};

export const createdNotification = content => {
  return {
    type: 'ANECDOTE_CREATED_NOTIFICATION',
    content
  };
};

export default reducer;
