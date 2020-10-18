import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./home-page.css"
import requests from './requests.js';

    
export default class Home extends Component{

    constructor(props){
        super(props);

        this.onChangeOrderStock = this.onChangeOrderStock.bind(this);
        this.onChangeOrderShares = this.onChangeOrderShares.bind(this);
        this.onChangeOrderPrice = this.onChangeOrderPrice.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        

        this.state = {
            stockPortfolio: [],
            unpUserSellOrders: [],

            stockID: null,
            shares: 0,
            price: 0,
        }
    }

    componentDidMount() {
        console.log('reloaded');
        axios.get('http://localhost:5000/users/5f890ebbbb89e66e947f5652') //dummy user ID in place
            .then(response => {
                this.setState({
                    stockPortfolio: response.data.stockPortfolio,
                    unpUserSellOrders: response.data.unpSellOrders
                })
                console.log(response.data.unpSellOrders)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeOrderStock(e){
        this.setState({
            stockID: e.target.value
        });
    }

    onChangeOrderShares(e){
        this.setState({
            shares: e.target.value
        });
        console.log(this.state.stockID);
    }

    onChangeOrderPrice(e){
        this.setState({
            price: e.target.value
        });
    }

    async onOrderSubmit(e){
        e.preventDefault();
        if(this.state.stockID != null){
            var stockOrders = await (requests.getStockSellOrders(this.state.stockID));        
            var newUserStockP = this.state.stockPortfolio;
            var objIndex = newUserStockP.findIndex((obj => obj.stockID == this.state.stockID));
            var newUserSellArray = this.state.unpUserSellOrders;
            if(newUserStockP[objIndex].shares >= Number(this.state.shares)){
                newUserSellArray.push({
                    stockID: this.state.stockID,
                    shares: Number(this.state.shares),
                    price: Number(this.state.price)
                });
                console.log(stockOrders);
                
                stockOrders.push({
                    userID: "jo",
                    shares: Number(this.state.shares),
                    price: Number(this.state.price)
                });

                newUserStockP[objIndex].shares = newUserStockP[objIndex].shares - Number(this.state.shares);
                axios.all([    
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/users/update/5f890ebbbb89e66e947f5652', //dummy user
                        data: {
                            stockPortfolio: newUserStockP,
                            unpSellOrders: newUserSellArray
                        }
                    }),
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/stocks/update/'+this.state.stockID ,
                        data: {
                            sellOrders: stockOrders
                        }
                    })
                ])
                .then(axios.spread((...responses) => {
                    //console.log(responses)                            
                    //window.location.reload(false)
                }))
                .then(
                    alert("Successfully created sell order"),
                    window.location.reload(false)
                )
                .catch(res => {
                    console.log(res)
                    alert("Sell Order creation failed. Please try again.")
                    window.location.reload(false)
                });
            }
            else{
                alert("Insufficient number of stocks owned.");
            }
        }
        else{
            alert("Select a stock to sell.");
        }
    }

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
                    <form onSubmit={this.onOrderSubmit}>
                        <h2>Stocks Owned</h2>
                        <table>
                            <th>Select</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Shares Owned</th>
                            <th>AVG price paid</th>
                            <th>Current value</th>
                            <tr>
                                <td><input type="radio" name="Sell" value="TSLA" onChange = {this.onChangeOrderStock}/></td>
                                <td>TSLA</td>
                                <td>Tesla</td>
                                <td>5</td>
                                <td>$40</td>
                                <td>$10</td>
                            </tr>

                            <tr>
                                <td><input type="radio" name="Sell" value="AAPL" onChange = {this.onChangeOrderStock}/></td>
                                <td>AAPL</td>
                                <td>Apple</td>
                                <td>7</td>
                                <td>$40</td>
                                <td>$10</td>
                            </tr>
                    
                            <tr>
                                <td><input type="radio" name="Sell" value="NKE" onChange = {this.onChangeOrderStock}/></td>
                                <td>NKE</td>
                                <td>Nike</td>
                                <td>2</td>
                                <td>$20</td>
                                <td>$25</td>
                            </tr>
                        </table>

                        <div>
                            <label>Enter Sell Price/Share: $</label>
                            <input type="number" min="0"
                                id="sellPrice-input"
                                value={this.state.price}
                                onChange = {this.onChangeOrderPrice}
                            /> 
                            <br/>
                            <label>Enter # Shares: </label>
                            <input type="number" min="0"
                                id="sell-shares"
                                value={this.state.shares}
                                onChange = {this.onChangeOrderShares}
                            />
                            <br/>
                            
                            <input type="submit" value='Place Sell Order'></input>
                        </div>
                    </form>
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