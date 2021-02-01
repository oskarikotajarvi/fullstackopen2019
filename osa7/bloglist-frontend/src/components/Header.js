import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';

const Header = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">Blog App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Blogs</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
        {user ? (
          <Nav>
            <Navbar.Text style={{ paddingRight: '1rem' }}>
              Logged in as: {user.name}
            </Navbar.Text>
            <Button variant="outline-info" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
