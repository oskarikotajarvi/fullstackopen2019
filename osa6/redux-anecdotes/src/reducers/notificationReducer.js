const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = content => {
  return {
    content: content,
    id: getId()
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...state, action.notification];

    case 'RESET_NOTIFICATION':
      return state.filter(notification => notification.id !== action.id);

    default:
      return state;
  }
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

export default reducer;
