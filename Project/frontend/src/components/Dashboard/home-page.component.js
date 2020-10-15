import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./home-page.css"

    
export default class Home extends Component{
    render() {
        return(
           <div>
            <div id = "top-nav" class = "view">Welcome User</div>
            <Navbar/>
            <div id = "dashboard-body" class = "dashboard">
                <div id = "user-funds" class = "view">
                    <h2>User Funds</h2>
                    <h4 id = "balance">Cash balance: $50</h4>
                    <h4 id = "total-value">Total portfolio value: $100</h4>

                    <div>
                    <label for="">Deposit Funds</label><br/>
                    <input type="text" name="" id="deposit-input" />
                    <button id = "deposit">Deposit</button><br/><br/>
                    </div>
                    <div>
                    <label for="">Widthdraw Funds</label><br/>
                    <input type="text" name="" id="widthdraw-input" />
                    <button id = "withdraw">Withdraw</button>
                </div>
                </div>
                
                <div id = "stocks-owned" class = "view">
                    <h2>Stocks Owned</h2>
                    <table>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Shares Owned</th>
                        <th>AVG price paid</th>
                        <th>Current value</th>
                        <tr>
                            <td>TES</td>
                            <td>Tesla</td>
                            <td>5</td>
                            <td>$40</td>
                            <td>$10</td>
                        </tr>
                    </table>
                </div>

                <div id = "unprocessed-orders" class = "view">
                    <h2>Unprocessed Orders</h2>
                    <table>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price per share</th>
                        <th>Outstanding</th>
                        <th>Fulfilled</th>
                        <tr>
                            <td>AAPL</td>
                            <td>Apple</td>
                            <td>Buy</td>
                            <td>$10</td>
                            <td>5</td>
                            <td>3</td>
                        </tr>
                    </table>
                </div>


                <div id = "watchlist" class = "view">
                    <h2>Watchlist</h2>
                    <table>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>$ / Share</th>
                        <th>Avg $ paid</th>
                        <th>Current value</th>
                        <tr>
                            <td>AAPL</td>
                            <td>Apple</td>
                            <td>$10</td>
                            <td>$40</td>
                            <td>$100</td>
                        </tr>
                    </table>
                </div>
                
                <div id = "event-subscriptions" class = "view">
                    <h2>Event Subscriptions</h2>
                    <table>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>$ / Share</th>
                        <th>AVG price paid</th>
                        <th>Current value</th>
                        <th>Trigger</th>
                        <tr>
                            <td>AAPL</td>
                            <td>Apple</td>
                            <td>$10</td>
                            <td>$40</td>
                            <td>$60</td>
                            <td>+5% </td>
                        </tr>
                    </table>
                </div>           
            </div>
        </div>
        )
    }

}