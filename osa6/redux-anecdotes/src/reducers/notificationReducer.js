const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = content => {
  return {
    content: content,
    id: getId()
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ANECDOTE_VOTE_NOTIFICATION':
      return [...state, asObject(`You voted "${action.data.notification}"`)];

    case 'ANECDOTE_CREATED_NOTIFICATION':
      return [...state, asObject(`Anecdote "${action.content}" created`)];

    case 'SET_NOTIFICATION':
      return [...state, action.notification];

    case 'RESET_NOTIFICATION':
      const newState = state.filter(
        notification => notification.id !== action.id
      );
      return newState;

    default:
      return state;
  }
};

export const resetNotification = id => {
  return {
    type: 'RESET_NOTIFICATION',
    id
  };
};

export const votedNotification = (content, notifyTime) => {
  return async dispatch => {
    const notification = asObject(content);
    dispatch({ type: 'ANECDOTE_VOTE_NOTIFICATION', data: notification });
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' });
    }, notifyTime * 1000);
  };
};

export const setNotification = (content, notifyTime) => {
  return async dispatch => {
    //Default reset time to 5 seconds if not specified
    let resetTime = notifyTime ? notifyTime : 5;
    const notification = asObject(content);
    await dispatch({ type: 'SET_NOTIFICATION', notification });
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION', id: notification.id });
    }, resetTime * 1000);
  };
};

export const createdNotification = content => {
  return {
    type: 'ANECDOTE_CREATED_NOTIFICATION',
    content
  };
};

export default reducer;
