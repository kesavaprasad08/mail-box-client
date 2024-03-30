import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const HomePage = () => {
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  return (
    <>
    <div className="d-flex justify-content-center">
      <h3>Welcome to Mail box Client </h3>
      </div>
      <div className="d-flex justify-content-center mt-5">
      {!isLoggedIn && <h4>
        Please <Link to="/login">Login</Link> or{" "}
        <Link to="/signup">Sign up</Link> To Continue
      </h4> 
}
      </div>
      </>
    
  );
};
export default HomePage;
