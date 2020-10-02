import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import RegisterUser from "./components/register-user.component";
import LoginUser from "./components/login-user.component";



function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/register" component={RegisterUser} />
      <Route path="/login" component={LoginUser} />
    </div>
    </Router>
  );
}

export default App;
