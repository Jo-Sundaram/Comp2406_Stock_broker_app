import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Register from "./components/Login/register-user.component";
import LoginUser from "./components/Login/login-user.component";
import Home from "./components/Dashboard/home-page.component";
import Search from "./components/Search/search-page.component"
import Account from "./components/Account/account.component"
import WatchlistPage from "./components/Watchlist/watchlist-page.component"




function App() {
  return (
    <Router>
    <div className="container">
     
      <br/>
      <Route path="/register" component={Register} />
      <Route path="/login" component={LoginUser} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/account" component={Account} />
      <Route path="/watchlist" component={WatchlistPage} />
    </div>
    </Router>
  );
}

export default App;
