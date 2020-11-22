const initialState = {
  message: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data.message, error: action.data.error };
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

let t;
/**
 * Sets a notification for specified time
 * @param notification {string} - Notification to show
 * @param error {boolean} - Is the notification an error
 * @param notifyTime {number} - Notification time in seconds
 */
export const setNotification = (message, error, notifyTime) => {
  return async dispatch => {
    //Clear possible timeout
    clearTimeout(t);
    //set resetTime to 5 seconds id not specified
    const resetTime = notifyTime ? notifyTime : 5;

    await dispatch({ type: 'SET_NOTIFICATION', data: { message, error } });
    t = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' });
    }, resetTime * 1000);
  };
};

export default reducer;
