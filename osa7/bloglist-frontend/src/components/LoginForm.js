import React from 'react';
import PropTypes from 'prop-types';
import { useField, useExcludeResetField } from '../hooks';

const LoginForm = ({ handleLogin }) => {
  const username = useField('text');
  const password = useField('password');

  const onLogin = async e => {
    e.preventDefault();
    await handleLogin(username.value, password.value);
  };

  return (
    <form onSubmit={onLogin} id="loginForm">
      <div>
        Username
        <input id="username" {...useExcludeResetField(username)} />
      </div>
      <div>
        Password
        <input id="password" {...useExcludeResetField(password)} />
      </div>
      <button type="submit" id="loginSubmit">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;
