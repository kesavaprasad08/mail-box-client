import React, { useRef } from "react";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";

const Login = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const signUpHandler = async (e) => {
    e.preventDefault();
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEYNz1oMqQOyT79dWNaZfxSygfzf1sdmk";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          history.replace("/mailbox");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";

            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        dispatch(
          authActions.login({
            token: data.idToken,
            email: data.email,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Card className=" p-2 mx-auto text-center col-md-6 col-lg-4 mt-5">
      <Card.Header>Login</Card.Header>
      <Card.Body>
        <Form>
          <InputGroup className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Email"
              required
              ref={emailInputRef}
              type="email"
            />
          </InputGroup>
          <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Password"
              type="password"
              required
              ref={passwordInputRef}
            />
          </InputGroup>

          {/* <Card.Title>Confirm Password</Card.Title> */}

          <Button variant="success" onClick={signUpHandler} type={"submit"}>
            Login
          </Button>
        </Form>
        <Link to="/">Forgot password</Link>
      </Card.Body>
      <p>
        Don't have an account? <Link to={"/signup"}> Sign up</Link>
      </p>
    </Card>
  );
};

export default Login;
