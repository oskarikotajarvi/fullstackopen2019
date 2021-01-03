import React from 'react';
import { useDispatch } from 'react-redux';
import { useField, useExcludeResetField } from '../hooks';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const _username = useField('text');
  const _password = useField('password');

  const onLogin = async (e) => {
    e.preventDefault();
    const username = _username.value;
    const password = _password.value;
    try {
      dispatch(login({ username, password }));
    } catch (error) {
      dispatch(setNotification('Incorrect username or password', true, 5));
    }
  };

  return (
    <form onSubmit={onLogin} id="loginForm">
      <div>
        Username
        <input id="username" {...useExcludeResetField(_username)} />
      </div>
      <div>
        Password
        <input id="password" {...useExcludeResetField(_password)} />
      </div>
      <button type="submit" id="loginSubmit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
