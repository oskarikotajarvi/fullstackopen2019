//const getId = () => (100000 * Math.random()).toFixed(0);

//const asObject = content => {
//return {
//content: content,
//id: getId()
//};
//};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      //return [...state, action.notification];
      console.log(action.notification);
      return action.notification;

    case 'RESET_NOTIFICATION':
      //return state.filter(notification => notification.id !== action.id);
      return null;

    default:
      return state;
  }
};

let t;

export const setNotification = (notification, notifyTime) => {
  return async dispatch => {
    clearTimeout(t);
    //Default reset time to 5 seconds if not specified
    let resetTime = notifyTime ? notifyTime : 5;
    //const notification = asObject(content);
    await dispatch({ type: 'SET_NOTIFICATION', notification });
    t = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' });
    }, resetTime * 1000);
  };
};

export default reducer;
