import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./layout/Header";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import MailBoxPage from "./pages/MailBoxPage";
import ComposeMailPage from "./pages/ComposeMail";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <Header />
      <Switch>
        {!isLoggedIn && (
          <Route path="/login">
            <Login />
          </Route>
        )}

        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {isLoggedIn && (
          <Route path="/mailbox" exact>
            <MailBoxPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/composeemail" exact>
            <ComposeMailPage />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
