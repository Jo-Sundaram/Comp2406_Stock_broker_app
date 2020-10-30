import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import './App.css';

import Register from "./components/Login/register-user.component";
import LoginUser from "./components/Login/login-user.component";
import Home from "./components/Dashboard/home-page.component";
import Search from "./components/Search/search-page.component"
import Account from "./components/Account/account.component"
import Watchlist from "./components/Watchlist/watchlist-page.component"
import EventSubscriptions from "./components/EventSubscriptions/event-subs.component"
import Secret from "./Secret";

function App() {
  let history = useHistory();

  return (
    // <Router>
     <div className="container">
       <Router>
       <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={LoginUser} />
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/account" component={Account} />
        <Route path="/watchlist" component={Watchlist} />
        <Route path="/eventsubs" component={EventSubscriptions} />
        <Route path="/secret" component={Secret} />
      </Switch>
      </Router>
     </div>
    // </Router>
  );
}

export default App;
