import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./nav.css";

const AppNavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" animation="false" bg="danger" variant="dark" fixed="top" className="pt-3 pb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="text-uppercase">
          BloodNation
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse animation="false" id="responsive-navbar-nav" style={{ backgroundColor: "inherit" }}>
          <Nav className="ml-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/faq">Faq</Nav.Link>
            <Nav.Link href="/contactus">Contact</Nav.Link>
          </Nav>
          <Nav className="pl-0 ml-0 pl-md-5 ml-md-5">
            <Nav.Link href="#deets" as={NavLink} to="/signin">
              Sign In
            </Nav.Link>
            <Button as={NavLink} to="/signup" variant="light" className="ml-0 ml-md-3">
              Signup
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
