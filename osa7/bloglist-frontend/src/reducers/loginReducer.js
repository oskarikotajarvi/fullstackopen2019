import loginService from '../services/login';
import blogService from '../services/blogs';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'USER_INIT':
      return action.data;
    case 'LOGIN':
      window.localStorage.setItem('loggedUser', JSON.stringify(action.data));
      return action.data;
    case 'LOGOUT':
      return action.data;
    default:
      return state;
  }
};

export const login = (credentials) => {
  return async (dispatch) => {
    const res = await loginService.login(credentials);
    blogService.setToken(res.token);
    dispatch({ type: 'LOGIN', data: res });
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch({ type: 'LOGOUT', data: null });
  };
};

export const initUser = () => {
  return async (dispatch) => {
    const initUser = window.localStorage.getItem('loggedUser');
    if (initUser === null) {
      dispatch({ type: 'USER_INIT', data: null });
    } else {
      const parsedInitUser = JSON.parse(initUser);
      blogService.setToken(parsedInitUser.token);
      dispatch({ type: 'USER_INIT', data: parsedInitUser });
    }
  };
};

export default reducer;
