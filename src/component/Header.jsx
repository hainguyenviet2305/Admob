import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../assets/LOGO-PROX-GLOBAL.png";
import './Header.scss';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          src={logo}
          height="40"
          className="d-inline-block align-top"
          alt="Prox Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/keyword">Keyword</Nav.Link>
          <Nav.Link as={Link} to="/user">User</Nav.Link>
          <Nav.Link as={Link} to="/email">Email</Nav.Link>
          <Nav.Link as={Link} to="/appinfo">App Info</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;