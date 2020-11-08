import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./search.css";
import "./searchbar.css";
import Navbar from "../NavBar/navbar.component";
import requests from '../functions/requests.js';

import SelectSearch from 'react-select-search';
import Axios from 'axios';

export default class Search extends Component{

    constructor(props){
        super(props);

        this.onChangeOrderShares = this.onChangeOrderShares.bind(this);
        this.onChangeOrderOffer = this.onChangeOrderOffer.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        
        this.onChangeEsAmount = this.onChangeEsAmount.bind(this);
		this.onChangeEsParameter = this.onChangeEsParameter.bind(this);
		this.onChangeEsType = this.onChangeEsType.bind(this);
        this.onEsSubmit = this.onEsSubmit.bind(this);
        this.onAddWatchlist = this.onAddWatchlist.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
		this.onChangeValueStartDay = this.onChangeValueStartDay.bind(this);
		this.onChangeValueEndDay = this.onChangeValueEndDay.bind(this);

        this.state = {
            userID: "",
            userFunds: 0,
            stockID: null,

            stocks:[],
            stockList:[],

            watchlists: [],
            selectedList: null,

			stockHistory: [],
			stockValueHistory: [],

			valueHistoryStartDay: 0,
			valueHistoryEndDay: 0,

            shares: 0,
            price: 0,

			esParameter: '',
			esType: '',
            esAmount: 0,

            ask: 'N/A',
            bid: 'N/A'
        }
    }


    componentDidMount() {
        console.log('reloaded /search');
    } 

	async componentWillReceiveProps(props){
        this.setState({
            userFunds: props.user.userFunds,
            userID: props.user._id,

        })


        var parsedList = await (requests.parseListItems(props.user._id));
        var stockParsedList = await (requests.parseStockItems());


        this.setState({
            watchlists : parsedList,
            stockList: stockParsedList,
        });

    } 

    onChangeOrderShares(e){
        this.setState({
            shares: e.target.value
        });
        console.log(this.state.shares);
    }

    async onChangeOrderOffer(e){
        this.setState({
            price: e.target.value
        });

        console.log("Price: " + this.state.price)
    }
    //creating buy order
    //need to add axios post sending the order to the stock
    //need to delete order from both in case of failure (we should make a function for that..?)
    //no pop up programmed confirming to the user that a buy order has been, or displaying order


    async onOrderSubmit(e){
        e.preventDefault();
        
        var orderTotal = Number(this.state.price)*Number(this.state.shares);
        
        console.log("User funds: " + this.state.userFunds)

        if (this.state.userFunds >= orderTotal && this.state.price > 0 && this.state.shares > 0){
            var newUserFunds = Number(this.state.userFunds) - orderTotal;
            console.log("Order Total: "+ orderTotal);
            var ID = await (requests.generateBuyID(this.state.stockID, this.state.userID));

            console.log("Stock on order: " + this.state.stockID);

            axios.all([
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/users/update/' + this.state.userID, 
                    data: {
                        userFunds: newUserFunds,
					},
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
                }),
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/update/' + this.state.userID + "/" + this.state.stockID+"/buyorder/add", 
                    data: {
                        orderID: ID,
                        stockID: this.state.stockID,
                        shares: Number(this.state.shares),
                        price: Number(this.state.price)
					},
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
                }),
  
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
	
	onChangeEsType(e){
        this.setState({
            esType: e.target.value        
        });
    }

    onChangeEsAmount(e){
        this.setState({
            esAmount: e.target.value        
        });
        console.log(this.state.stockID);
    }

    async onEsSubmit(e){
        e.preventDefault();
        if(this.state.esParameter !=null && this.state.esAmount != null && this.state.esAmount != 0){
            
            var ID = await (requests.generateESID(this.state.stockID, this.state.userID));

            axios({
                method: 'post',
                url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.stockID+'/ES/add', //dummy user
                data: {
                    subscriptionID: ID,
                    parameter: this.state.esParameter,
                    value: this.state.esAmount,
					triggerOrder: 0,
					type: this.state.esType,
					notifSent: 0
				},
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
            })
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

    onAddWatchlist(e){
        e.preventDefault();

        if(this.state.selectedList != null & this.state.stockID != null){
            axios({
                method: 'post',
                url: 'http://localhost:5000/users/'+this.state.userID+'/watchlist/update/add', //dummy user
                data: {
                    name: this.state.selectedList,
                    stockID: this.state.stockID
                },
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
            })
            .then(res => {
                console.log(res.data)
                alert('Added to watchlist')
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert('Something went wrong! Please try again later.')
            });
        }
        else{
            alert('Invalid selection');
        }
	}
	
	onChangeValueStartDay(e){
		this.setState({
            valueHistoryStartDay: e.target.value        
        });
	}

	onChangeValueEndDay(e){
		this.setState({
            valueHistoryEndDay: e.target.value        
        });
	}

    handleChange = async (stockID) => {
        this.setState({ stockID });

        var highestAsk = await (requests.getHighestAsk(stockID));
        var lowestAsk = await (requests.getLowestBid(stockID));
	   // var history = await (requests.getHistory(stockID));
	   
		var valueHistory = await (requests.getValueAllHistory(stockID));
        this.setState({
            ask: highestAsk,
			bid: lowestAsk,
			stockValueHistory: valueHistory
         //   stockHistory: history
        });
    }

    handleChangeWatchlist = async (selectedList) => {
        this.setState({ selectedList });
    }

    render(){
       
        return(
                <div>
                    <Navbar/>
                    <div id = "top-nav" >
                        <div>
                            <SelectSearch 
                            options={this.state.stockList} 
                            search
                            onChange = {this.handleChange}
                            name="stocks" 
                            placeholder="Search for a stock" />
                        </div>
                    </div>
                    <div id = "main-body" class = "main">
                        <div id = "recent-asks">
                            <div id =" stock-name">
                            Stock Name: {this.state.stockID}
                            </div>

                            <h4><span id = "bid"> Highest Bid: ${this.state.bid}</span></h4>

                            <h4><span id = "ask"> Ask: ${this.state.ask}</span> </h4>

                            <SelectSearch 
                                options={this.state.watchlists}
                                search
                                onChange={this.handleChangeWatchlist}
                                name="stocks" 
                                placeholder="Select a watchlist" />
                            
                            <div>
                                <button onClick = {this.onAddWatchlist}>Add to Watchlist</button>
                            </div>
                            

                        </div>

                        <div id = "stock-processed-history">
						

                        <b> History of Processed Orders</b>

                            <table id = "stock-history">
                                <th>Sell Price</th>
                                <th>Buy Price</th>
                                <th>Shares</th>
                                <th>Bidder Username</th>
                                <th>Seller Username</th>    

                                {this.state.stockHistory.map((item,index)=>(
                                    <tr>
                                        <td>{item.seller}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>

                                ))}                    
                            </table>
                        </div>

						
						<div id = "stock-value-history">
							<div>
								<input name="number" id = "select-params" value={this.state.valueHistoryStartDay} onChange = {this.onChangeValueStartDay}/>
								<input name="number" id = "select-params" value={this.state.valueHistoryEndDay} onChange = {this.onChangeValueEndDay}/>
							</div>
							
                        <b> Stock Price History</b>
							

                            <table id = "stock-history">
								
								<th>Day</th>
                                <th>Highest Ask</th>
                                <th>Lowest Ask</th>
                                <th>Highest Bid</th>
                                <th>Lowest Bid</th>
                                <th>Shares Sold</th>    

                                {this.state.stockValueHistory.map((item,index)=>(
                                    <tr>
                                        <td>{item.day}</td>
                                        <td>{item.highestAsk}</td>
                                        <td>{item.lowestAsk}</td>
                                        <td>{item.highestBid}</td>
                                        <td>{item.lowestBid}</td>
										<td>{item.sharesSold}</td>
                                    </tr>
                                ))}                    
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
                                </select>

								<select name="select" id = "select-params" value={this.state.type} onChange = {this.onChangeEsType}>
                                    <option value="Bid">Bid</option>
                                    <option value="Ask">Ask</option>
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
