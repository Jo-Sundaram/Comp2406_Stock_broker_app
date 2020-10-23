import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./home-page.css"
import requests from '../functions/requests.js';

    
export default class Home extends Component{

    constructor(props){
        super(props);

        this.onChangeOrderStock = this.onChangeOrderStock.bind(this);
        this.onChangeOrderShares = this.onChangeOrderShares.bind(this);
        this.onChangeOrderPrice = this.onChangeOrderPrice.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        
        this.onSelectCancel = this.onSelectCancel.bind(this);
        this.onCancelOrder = this.onCancelOrder.bind(this);

        this.onChangeDep = this.onChangeDep.bind(this);
        this.onSubmitDep = this.onSubmitDep.bind(this);

        this.onChangeWith = this.onChangeWith.bind(this);
        this.onSubmitWith = this.onSubmitWith.bind(this);

        

        this.state = {
            userID: "5f890ebbbb89e66e947f5652",
            userFunds: 0,
            stockPortfolio: [],
            userSellOrders: [],
            userBuyOrders: [],
            eventSubscriptions: [],
            
            stockID: null,
            shares: 0,
            price: 0,

            depAmount: 0,
            withAmount: 0,
            cancelStockID: null,
            cancelOrderID: null,
            cancelType: null
        }
    }

    componentDidMount() {
        console.log('reloaded');
        axios.get('http://localhost:5000/users/' + this.state.userID) //dummy user ID in place
            .then(response => {
                this.setState({
                    userFunds: response.data.userFunds,
                    stockPortfolio: response.data.stockPortfolio,
                    userSellOrders: response.data.unpSellOrders,
                    userBuyOrders: response.data.unpBuyOrders,
                    eventSubscriptions: response.data.eventSubscriptions
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
              
            var newUserStockP = this.state.stockPortfolio;
            var objIndex = this.state.stockPortfolio.findIndex((obj => obj.stockID == this.state.stockID));
            console.log(objIndex);
            if(newUserStockP[objIndex].shares >= Number(this.state.shares)){

                var ID = await (requests.generateSellID(this.state.stockID, this.state.userID));

                newUserStockP[objIndex].shares = newUserStockP[objIndex].shares - Number(this.state.shares);
                axios.all([    
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/users/update/'+this.state.userID, 
                        data: {
                            stockPortfolio: newUserStockP,
                        }
                    }),
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/users/update/sellorder/'+this.state.userID, 
                        data: {
                            orderID: ID,
                            stockID: this.state.stockID,
                            shares: Number(this.state.shares),
                            price: Number(this.state.price)
                        }
                    }),
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/stocks/update/sellorder/' + this.state.stockID, //dummy user
                        data: {
                            orderID: ID,
                            userID: "jo", //dummy userID
                            shares: Number(this.state.shares),
                            price: Number(this.state.price)
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

    onSelectCancel(e){
        this.setState({
            cancelStockID: e.target.value.split(",")[0],
            cancelOrderID: e.target.value.split(",")[1],
            cancelType: e.target.value.split(",")[2]
        });
        console.log(e.target.value.split(",")[1]);
    }

    onCancelOrder(e){
        e.preventDefault();
        if(this.state.cancelOrderID != null && this.state.cancelStockID !=null){
            axios.all([
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/users/delete/'+this.state.cancelType+'/' +this.state.userID, //dummy user
                    data: {
                        orderID: this.state.cancelOrderID
                    }
                }),
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/stocks/delete/'+this.state.cancelType+'/' + this.state.cancelStockID, //dummy user
                    data: {
                        orderID: this.state.cancelOrderID
                    }
                }),
            ])
            .then(res => {
                console.log(res.data)
                alert("Successfully cancelled buy order.")
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert("Cancellation failed. Please try again later.");
            })
        }
    }

    onChangeDep(e){
        this.setState({
            depAmount: e.target.value
        });
    }

    onSubmitDep(e){
        e.preventDefault()
        if(this.state.depAmount !=0){
            var newFunds = this.state.userFunds+Number(this.state.depAmount);
            axios({
                method: 'post',
                url: 'http://localhost:5000/users/update/' + this.state.userID, 
                data: {
                    userFunds: newFunds,
                }
            })
            .then(res => {
                console.log(res.data)
                //i want a function for this.
                alert('Deposit Successful')

                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert('Something went wrong! Please try again later.')
                window.location.reload(false);
            });
        }
    }

    onChangeWith(e){
        this.setState({
            withAmount: e.target.value
        });
    }

    onSubmitWith(e){
        e.preventDefault()
        if(this.state.withAmount !=0 && this.state.withAmount<=this.state.userFunds){
            var newFunds = this.state.userFunds-Number(this.state.withAmount);
            axios({
                method: 'post',
                url: 'http://localhost:5000/users/update/' + this.state.userID, 
                data: {
                    userFunds: newFunds,
                }
            })
            .then(res => {
                console.log(res.data)
                //i want a function for this.
                alert('Withdrawal Successful')

                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert('Something went wrong! Please try again later.')
                window.location.reload(false);
            });
        }
        else{
            alert('Invalid Input. Make sure you have the funds to withdraw.')
            window.location.reload(false);
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
                    <h4 id = "balance">Cash balance: ${this.state.userFunds}</h4>
                    <h4 id = "total-value">Total portfolio value: $100</h4>

                    <div>
                        <form onSubmit={this.onSubmitDep}>
                            <label for="">Deposit Funds</label><br/>
                            <input 
                                type="number" min="0"
                                value={this.state.depAmount}
                                onChange = {this.onChangeDep}
                            />
                            <input type="submit" value='Deposit'></input>
                        </form>
                    </div>
                    
                    <div>
                        <form onSubmit={this.onSubmitWith}>
                            <label for="">Widthdraw Funds</label><br/>
                            <input 
                                type="number" min="0"
                                value={this.state.withAmount}
                                onChange = {this.onChangeWith} />
                            <input type="submit" value='Withdraw'></input>
                        </form>
                    </div>
                </div>
                
                <div id = "stocks-owned" class = "view">
                    <form onSubmit={this.onOrderSubmit}>
                        <h2>Stocks Owned</h2>
                        <table>
                            <th>Select</th>
                            <th>Symbol</th>
                            <th>Shares Owned</th>
                            <th>AVG price paid</th>
                            <th>Current value</th>
                            {this.state.stockPortfolio.map((item =>
                            <tr>
                                <td><input type="radio" name="Sell" value={item.stockID} onChange = {this.onChangeOrderStock}/></td>
                                <td>{item.stockID}</td>
                                <td>{item.shares}</td>
                                <td>50</td>
                                <td>45</td>
                            </tr>
                            ))}
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

                <form onSubmit={this.onCancelOrder}>
                    <div id = "unprocessed-buy-orders" class = "view">
                        
                        <h2>Unprocessed Buy Orders</h2>
                        <table>
                            <th>Select</th>	
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Price per share</th>
                            <th>Shares</th>
                            <th>Fulfilled</th>
                            {this.state.userBuyOrders.map((item =>
                            <tr>
                                <td><input type="radio" name="Sell" value={[item.stockID, item.orderID,"buyorder"]} onChange = {this.onSelectCancel}/></td>
                                <td>{item.stockID}</td>
                                <td>Buy</td>
                                <td>{item.price}</td>
                                <td>{item.shares}</td>
                                <td>False</td>
                            </tr>
                            ))}
                        </table>
                        <input type="submit" value='Cancel Order'></input>
                    </div>
                    <div id = "processed-buy-orders" class = "view">
                        
                        <h2>Unprocessed Buy Orders</h2>
                        <table>
                            <th>Select</th>	
                            <th>Symbol</th>
                            <th>Type</th>
                            <th>Price per share</th>
                            <th>Shares</th>
                            <th>Fulfilled</th>
                            {this.state.userSellOrders.map((item =>
                            <tr>
                                <td><input type="radio" name="Sell" value={[item.stockID, item.orderID,"sellorder"]} onChange = {this.onSelectCancel}/></td>
                                <td>{item.stockID}</td>
                                <td>Sell</td>
                                <td>{item.price}</td>
                                <td>{item.shares}</td>
                                <td>False</td>
                            </tr>
                            ))}
                        </table>
                        <input type="submit" value='Cancel Order'></input>
                    </div>
                </form>



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
                        <th>$ / Share</th>
                        <th>AVG price paid</th>
                        <th>Current value</th>
                        <th>Trigger</th>
                        {this.state.eventSubscriptions.map((item =>
                            <tr>
                                <td>{item.stockID}</td>
                                <td>Buy</td>
                                <td>$0</td>
                                <td>0</td>
                                <td>False</td>
                            </tr>
                        ))}
                    </table>
                </div>           
            </div>
        </div>
        )
    }
}