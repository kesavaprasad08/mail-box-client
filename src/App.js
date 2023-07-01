
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layout/Header";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>

      </Routes>
    
    </div>
  );
}

export default App;
