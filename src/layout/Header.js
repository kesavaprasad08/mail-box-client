import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const logoutHandler = () => {
dispatch(authActions.logout());
  }
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Mail Box</Navbar.Brand>
        <Nav> 
        {!isLoggedIn && <NavLink className={" mx-3 "}  to={"./signup"}>Sign Up</NavLink>}
          {!isLoggedIn && <NavLink className={" mx-3 "}  to={"./login"}>Login</NavLink>}
          {isLoggedIn && <NavLink className={" mx-3 "}  to={"./composeemail"}><Button>Compose Email</Button></NavLink>}
          {isLoggedIn && <Button onClick={logoutHandler}>Logout</Button>}
        </Nav>
      </Container>
    </Navbar>
  );  
};

export default Header;
