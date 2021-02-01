import React from 'react';
import { useDispatch } from 'react-redux';
import { useField, useExcludeResetField } from '../hooks';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    <Container className="justify-content-center">
      <Row className="justify-content-center">
        <h1>Login</h1>
      </Row>
      <Form onSubmit={onLogin}>
        <Row className="justify-content-center">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Userame"
              {...useExcludeResetField(_username)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              {...useExcludeResetField(_password)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Button type="submit" variant="primary">
            Login
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginForm;
