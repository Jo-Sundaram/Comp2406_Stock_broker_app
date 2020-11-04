import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './App.css';

import Register from "./components/Login/register-user.component";
import LoginUser from "./components/Login/login-user.component";
import Home from "./components/Dashboard/home-page.component";
import Search from "./components/Search/search-page.component"
import Account from "./components/Account/account.component"
import Watchlist from "./components/Watchlist/watchlist-page.component"
import EventSubscriptions from "./components/EventSubscriptions/event-subs.component"
import Secret from "./Secret";

const ENDPOINT = "http://127.0.0.1:5000";

function App() {
  let history = useHistory();

  const [response, setResponse] = useState("");
  const [userInfo, setUser] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    fetch("http://localhost:5000/api/secret", {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },})
      .then((res) => {
          return res.json();
      })
      .then((user) => {
        setUser(user);
          console.log(user);
          socket.emit("connected", user._id);
      })
      .catch((err) => {
          console.log(err);
      });
      
    socket.on("FromAPI", data => {
        setResponse(data);
    });

    socket.on("processedBuyOrder", (purchase, stockAbbreviation) => {
      alert("You bought " + purchase.shares + ' shares of ' + stockAbbreviation + " for $" + purchase.soldFor + " from " + purchase.sellerID);
    });

    socket.on("processedSellOrder", (purchase, stockAbbreviation) => {
      alert("You sold " + purchase.shares + ' shares of ' + stockAbbreviation + " for $" + purchase.soldFor + " to " + purchase.buyerID);
    });

    socket.on("eventNotif", (notification) => {
      alert("EVENT SUBSCRIPTION: " + notification.stock + " " + notification.type + " " + notification.change + " by " + notification.value + notification.param + ".");
    });

  }, []);

  return (
    // <Router>
      <div className="container">
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
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
  );
}

export default App;
