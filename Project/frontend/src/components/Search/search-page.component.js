import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./search.css"
import Navbar from "../NavBar/navbar.component";

export default class Search extends Component{

    constructor(props){
        super(props);

        this.onChangeOrderShares = this.onChangeOrderShares.bind(this);
        this.onChangeOrderOffer = this.onChangeOrderOffer.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        
        this.onChangeEsAmount = this.onChangeEsAmount.bind(this);
        this.onChangeEsParameter = this.onChangeEsParameter.bind(this);
        this.onEsSubmit = this.onEsSubmit.bind(this);

        this.state = {
            userFunds: 0,
            stockID: 'TSLA',
            unpBuyOrders: [],
            eventSubscriptions: [],

            stockES: [],
            stockBuyOrders: [],

            shares: 0,
            price: 0,

            esParameter: '',
            esAmount: 0
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://localhost:5000/users/5f890ebbbb89e66e947f5652'), //dummy user ID in place
            axios.get('http://localhost:5000/stocks/' + this.state.stockID)
        ])
        .then(responseArr => {
            this.setState({
                userFunds: responseArr[0].data.userFunds,
                unpBuyOrders: responseArr[0].data.unpBuyOrders,
                eventSubscriptions: responseArr[0].data.eventSubscriptions,
                stockBuyOrders: responseArr[1].data.buyOrders,
                stockES: responseArr[1].data.eventSubscriptions
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onChangeOrderShares(e){
        this.setState({
            shares: e.target.value
        });
        console.log(this.state.stockAbb);
    }

    onChangeOrderOffer(e){
        this.setState({
            price: e.target.value        
        });
    }
    //creating buy order
    //need to add axios post sending the order to the stock
    //need to delete order from both in case of failure (we should make a function for that..?)
    //no pop up programmed confirming to the user that a buy order has been, or displaying order
    onOrderSubmit(e){
        e.preventDefault();
        
        var orderTotal = Number(this.state.price)*Number(this.state.shares);
        if (this.state.userFunds >= orderTotal && this.state.price > 0 && this.state.shares > 0){
            var newArray = this.state.unpBuyOrders;
            var newStockOrders = this.state.stockBuyOrders;
            var newUserFunds = Number(this.state.userFunds) - orderTotal;
            newArray.push({
                stockID: this.state.stockID,
                shares: Number(this.state.shares),
                price: Number(this.state.price)
            });
            newStockOrders.push({
                userID: "jo", //dummy userID
                shares: Number(this.state.shares),
                price: Number(this.state.price)
            })
            axios.all([
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/users/update/5f890ebbbb89e66e947f5652', //dummy user
                    data: {
                        userFunds: newUserFunds,
                        unpBuyOrders: newArray
                    }
                }),
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/stocks/update/' + this.state.stockID, //dummy user
                    data: {
                        buyOrders: newStockOrders
                    }
                })
            ])
            .then(res => {
                console.log(res.data)
                //i want a function for this.
                alert('ORDER: \n' +
                this.state.stockID + ' \n' + 
                '$' + this.state.price +'/Share \n' +
                'Shares: ' + this.state.shares + '\n' +
                'Placed Successfully!')

                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert('Something went wrong! Please try again later.')
                window.location.reload(false);
            });

        }
        else{
            if(this.state.userFunds < orderTotal){
                alert("you broke. go home");
            }
        }
    }

    onChangeEsParameter(e){
        this.setState({
            esParameter: e.target.value        
        });
    }

    onChangeEsAmount(e){
        this.setState({
            esAmount: e.target.value        
        });
    }

    onEsSubmit(e){
        e.preventDefault();
        var newEsArray = this.state.eventSubscriptions;
        var newStockES = this.state.stockES;
        if(this.state.esParameter !=null && this.state.esAmount != null && this.state.esAmount != 0){
            newEsArray.push({
                stockID: this.state.stockID,
                parameter: this.state.esParameter,
                value: this.state.EsAmount,
                triggerOrder: 0
            });
            newStockES.push({
                stockID: this.state.stockID,
                parameter: this.state.esParameter,
                value: this.state.EsAmount,
                triggerOrder: 0
            });
            axios.all([
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/users/update/5f890ebbbb89e66e947f5652', //dummy user
                    data: {
                        eventSubscriptions: newEsArray
                    }
                }),
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/stocks/update/' + this.state.stockID, //dummy user
                    data: {
                        eventSubscriptions: newStockES
                    }
                }),
            ])
            .then(res => {
                console.log(res.data)
                alert("Successfully created ES")
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert("ES creation failed. Please try again.");
            })
        }
        //window.location.reload(false);    
    }

    render(){
        return(
                <div>
                    <Navbar/>
                    <div id = "top-nav" >
                        <div>
                        <label for="searchbar"> Search for stocks</label>
                        
                            <input type="text" name="" id="searchbar" placeholder="TSLA"/>
                            <button id = "search-enter">Enter</button>
                        </div>
                    </div>
                    <div id = "main-body" class = "main">
                        <div id = "recent-asks">
                            <div id =" stock-name">
                            Stock Name: 
                            </div>

                            <h4><span id = "bid"> Highest Bid: $</span></h4>

                            <h4><span id = "ask"> Ask: $</span> </h4>

                        </div>

                        <div id = "stock-processed-history">
                        <b> History of Processed Orders</b>

                            <table id = "stock-history">
                                <th>Sell Price</th>
                                <th>Shares</th>
                                <th>BidderUsername</th>
                                <th>Seller Username</th>                        
                            </table>
                        </div>
                    <div id = "place-buy">
                        <form onSubmit={this.onOrderSubmit}>
                            <div className="formgroup">
                                <b>Place Buy Order</b><br/><br/>
                                    <label>Enter number of shares: </label>
                                    <input type="number" min="0" 
                                        required class="logregfield"
                                        value = {this.state.shares}
                                        onChange = {this.onChangeOrderShares}
                                        placeholder="50"
                                    />
                                    <label>Enter offer per share:  $</label>
                                    <input type="number" min="0" 
                                        required class="logregfield" 
                                        value = {this.state.price}
                                        onChange = {this.onChangeOrderOffer}
                                        placeholder="100"/>  
                            </div>

                            <div>
                                <input type="submit" value='Place Buy Order'></input>
                            </div>
                        </form>
                    
                    </div>


                    <div id = "create-event">
                        <form onSubmit={this.onEsSubmit}>
                            <div className="formgroup">
                                <b>Create an Event Subscription</b><br/>
                                <label>Select Parameter</label>
                                <select name="select" id = "select-params" value={this.state.parameter} onChange = {this.onChangeEsParameter}>
                                    <option value="incPrcnt">+ %</option>
                                    <option value="decPrcnt">- %</option>
                                    <option value="incDollar">+ $</option>
                                    <option value="decDollar">- $</option>
                                </select> <br/>

                                <label>Enter amount</label>
                                <input type="number" min="0" 
                                    required class="logregfield"
                                    value={this.state.parameter} 
                                    onChange = {this.onChangeEsAmount}
                                    placeholder="%10"/>
                            </div>
                            <div>
                            <input type="submit" value='Place Event Subscription'></input>
                            </div>
                        </form>
                    
                    </div>

                    </div>

                </div>
        )
    }

}
