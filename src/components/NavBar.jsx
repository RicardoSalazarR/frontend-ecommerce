import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const userType = localStorage.getItem("userType");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/purchases">
                Purchases
              </Nav.Link>
              <Nav.Link onClick={handleShow}>Cart</Nav.Link>
              <Nav.Link as={Link} to="/manage/products" className={userType==="vendedor"?"":'hide'}>
                Manage products
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
