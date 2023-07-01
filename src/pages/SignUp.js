import React, { useRef } from "react";
import { Card, InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
  const emailRef = useRef();
  const pasRef = useRef();
  const confirmPassRef = useRef();
  const signUpHandler = async (e) => {
    e.preventDefault();

      const password= pasRef.current.value;
      const confirmPasswordRef= confirmPassRef.current.value;
    
if(password===confirmPasswordRef){

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEYNz1oMqQOyT79dWNaZfxSygfzf1sdmk",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: pasRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("user successfully created");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })

      .catch((err) => console.log(err));
    }
    else{
alert('password does not match')
    }
  };
  return (
    <Card className=" p-2 mx-auto text-center col-md-6 col-lg-4 mt-5">
      <Card.Header>{"Sign Up"}</Card.Header>
      <Card.Body>
        <Form>
          <InputGroup className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Email"
              required
              ref={emailRef}
              type="email"
            />
          </InputGroup>
          <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Password"
              type="password"
              required
              ref={pasRef}
            />
          </InputGroup>

          {/* <Card.Title>Confirm Password</Card.Title> */}
          <InputGroup variant={"password"} className="mb-3 w-75 mx-auto">
            <Form.Control
              placeholder="Confirm Password"
              required
              ref={confirmPassRef}
              type="password"
            />
          </InputGroup>

          <Button variant="success" onClick={signUpHandler} type={"submit"}>
            Create Account
          </Button>
        </Form>
      </Card.Body>
      <p>
        Have an Account ? <Link to={"/login"}>Log in</Link>
      </p>
    </Card>
  );
};
export default Signup;
