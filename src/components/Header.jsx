// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';

const Header = ({ cart, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Fruit Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cart">
              <div className="d-flex align-items-center">
                <FaShoppingCart size={24} />
                <Badge bg="danger" className="ml-2">{cart.length}</Badge>
              </div>
            </Nav.Link>
            <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
