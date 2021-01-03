import usersService from '../services/users';

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_ALL':
      return action.data;
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const res = await usersService.fetchUsers();
    dispatch({ type: 'GET_ALL', data: res });
  };
};

export default reducer;
