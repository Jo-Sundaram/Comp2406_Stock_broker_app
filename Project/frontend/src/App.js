import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import Register from "./components/register-user.component";
import LoginUser from "./components/login-user.component";
import Home from "./components/home-page.component";




function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/register" component={Register} />
      <Route path="/login" component={LoginUser} />
      <Route path="/home" component={Home} />
    </div>
    </Router>
  );
}

export default App;
