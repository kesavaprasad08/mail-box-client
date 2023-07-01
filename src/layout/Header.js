import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Mail Box</Navbar.Brand>
        <Nav>
          <NavLink className={" mx-3 "}  to={"./signup"}>Sign Up</NavLink>
          <NavLink className={" mx-3 "}  to={"./login"}>Login</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );  
};

export default Header;
