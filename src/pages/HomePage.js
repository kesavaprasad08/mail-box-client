import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
    return<h1>Home Page
        <Link to='/mailbox'>hi</Link>
    </h1>
};
export default HomePage;