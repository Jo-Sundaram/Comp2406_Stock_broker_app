import React, { Component, useContext } from 'react';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./home-page.css"
import requests from '../functions/requests.js';
import helper from "../functions/helper.js"
import SelectSearch from 'react-select-search';
    
export default class Home extends Component{

    constructor(props){
        super(props);
        this.onChangeOrderStock = this.onChangeOrderStock.bind(this);
        this.onChangeOrderShares = this.onChangeOrderShares.bind(this);
        this.onChangeOrderPrice = this.onChangeOrderPrice.bind(this);
        this.onSellOrderSubmit = this.onSellOrderSubmit.bind(this);
        
        this.onSelectCancel = this.onSelectCancel.bind(this);
        this.onCancelOrder = this.onCancelOrder.bind(this);
        
        this.onSelectRemove = this.onSelectRemove.bind(this);
        this.onCancelES = this.onCancelES.bind(this);

        this.onChangeDep = this.onChangeDep.bind(this);
        this.onSubmitDep = this.onSubmitDep.bind(this);

        this.onChangeWith = this.onChangeWith.bind(this);
        this.onSubmitWith = this.onSubmitWith.bind(this);

        

        this.state = {
            userID: null,
            userFunds: 0,
            stockPortfolio: [],
            userSellOrders: [],
            userBuyOrders: [],
            eventSubscriptions: [],
            watchlistCollection:[],
            parsedLists: [],
			WLitems: [],
			fundsHistory: [],
			
			fullfilledBOrders: [],
			fullfilledSOrders: [],

            stockID: null,
            shares: 0,
            price: 0,

            depAmount: 0,
            withAmount: 0,
            cancelStockID: null,
            cancelOrderID: null,
            cancelType: null,

            cancelESStockID: null,
            cancelESSubID: null,
            
            user: null,
            
		}
    }

    componentDidMount() {
        console.log('reloaded /home');
     
    }  
  
	async componentWillReceiveProps(props){ //this is called to before render method
		
		let stockList = props.user.stockPortfolio;
		let stocksOwned = []
		for(var i in stockList){
			stocksOwned.push('"'+stockList[i].stockID+'"');
		}

		const promise = axios.get('http://localhost:5000/stocks/array/0?array=['+ stocksOwned +']'); //dummy user ID in place
        
		const dataPromise = await promise.then((response) => response.data.stocks);
		
		for(var j in stockList){
			for(var k in dataPromise){
				if(dataPromise[k].symbol == stockList[j].stockID){
					stockList[j]["currentAsk"] = dataPromise[k].currentAsk;
					stockList[j]["currentBid"] = dataPromise[k].currentBid;
				}
			}
		}

        this.setState({
            user : props.user.username,
            userID: props.user._id,
            userFunds: props.user.userFunds,
            stockPortfolio: stockList,
            userSellOrders: props.user.unpSellOrders,
            userBuyOrders: props.user.unpBuyOrders,
            eventSubscriptions: props.user.eventSubscriptions,
			watchlistCollection: props.user.watchListCollection,
			
			fundsHistory: props.user.fundsHistory,

			fullfilledBOrders: props.user.pBuyOrders,
			fullfilledSOrders: props.user.pSellOrders,

         }) 

         console.log("this user in props: " + this.state.userID);

         var parsedList = []
         try {
             parsedList = await (helper.parseListItems(props.user._id));            
         }
           catch(e) {
             console.log('Catch an error: ', e)
         }
         
         this.setState({parsedLists:parsedList});
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
        console.log("Shares: " + this.state.shares);
    }

    onChangeOrderPrice(e){
        this.setState({
            price: e.target.value
        });
    }

   
    async onSellOrderSubmit(e){
        e.preventDefault();
        if(this.state.stockID != null){
              
            var newUserStockP = this.state.stockPortfolio;
            var objIndex = this.state.stockPortfolio.findIndex((obj => obj.stockID == this.state.stockID));
            console.log("objIndex: "+ this.state.shares);
            if(newUserStockP[objIndex].shares >= Number(this.state.shares)){

                var ID = await (requests.generateSellID(this.state.stockID, this.state.userID));

                newUserStockP[objIndex].shares = newUserStockP[objIndex].shares - Number(this.state.shares);
                console.log(this.state.shares)
                axios.all([    
                  /*   axios({
                        method: 'post',
                        url: 'http://localhost:5000/users/update/'+this.state.userID, 
                        data: {
                            stockPortfolio: newUserStockP,
                        },
						headers: {
							Authorization: "Bearer " + localStorage.getItem("token")
						}
                    }), */
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/update/'+this.state.userID + '/'+this.state.stockID+'/sellorder/add',
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
                .then(
                    alert("Successfully created sell order"),
                    window.location.reload(false)
                )
                .catch(err => {
                    console.log(err)
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
                    method: 'delete',
                    url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.cancelStockID+'/'+this.state.cancelType+'/remove/' +this.state.cancelOrderID, //dummy user
                    data: {
                        orderID: this.state.cancelOrderID
                    },
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
                })
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
                url: 'http://localhost:5000/users/' + this.state.userID +'/updateFunds', 
                data: {
					type: "Deposit",
					amount: this.state.depAmount,
                    userFunds: newFunds,
                },
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
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
				url: 'http://localhost:5000/users/' + this.state.userID +'/updateFunds', 
				data: {
					type: "Withdrawal",
					amount: this.state.withAmount,
                    userFunds: newFunds,
				},
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
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
               // window.location.reload(false);
            });
        }
        else{
            alert('Invalid Input. Make sure you have the funds to withdraw.')
            window.location.reload(false);
        }
    }


    onSelectRemove(e){
        this.setState({
            cancelESStockID: e.target.value.split(",")[0],
            cancelESSubID: e.target.value.split(",")[1]

        });
    }

    onCancelES(e){
        e.preventDefault();
        if(this.state.cancelESStockID != null && this.state.cancelESSubID!=null){
            axios.all([
                axios({
                    method: 'delete',
                    url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.cancelESStockID+ '/ES/remove/' +this.state.cancelESSubID, //dummy user,
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
                  
                })
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


    handleListChange = async (listname) => {
        this.setState({ listname });
    
		var stocksInWL = await (helper.getStockItems(this.state.userID, listname));
		let stocks = [];

		for(var i in stocksInWL){
			stocks.push('"'+stocksInWL[i].stockID+'"');
		}

		console.log('http://localhost:5000/stocks/array/0?array=['+ stocks +']');
		const promise = axios.get('http://localhost:5000/stocks/array/0?array=['+ stocks +']'); //dummy user ID in place
        
		const dataPromise = await promise.then((response) => response.data.stocks);
		
		console.log(dataPromise);

		for(var j in stocksInWL){
			for(var k in dataPromise){
				if(dataPromise[k].symbol == stocksInWL[j].stockID){
					stocksInWL[j]["currentAsk"] = dataPromise[k].currentAsk;
					stocksInWL[j]["currentBid"] = dataPromise[k].currentBid;
					console.log("?!!!")
				}
			}
		}

        this.setState({
            WLitems: stocksInWL
        });

        console.log(stocksInWL);
    }

    render() {
  
        console.log("portfolio: " + this.props.user.stockPortfolio);

        console.log("This user in render: " + this.state.userID);
        return(
            
           <div>
            <div class = "topnav">
				<p>Welcome {this.state.user}</p></div>
            <Navbar/>
            <div id = "dashboard-body" class = "dashboard">
                <div id = "user-funds" class = "view">
                    <h2>User Funds</h2>
                    <b id = "balance">Cash balance: ${this.state.userFunds}</b>
                    <b id = "total-value">Total portfolio value: $100</b>
                    
					<br></br>
                    <div>
                        <form onSubmit={this.onSubmitDep}>
                            <label for="">Deposit Funds</label><br/>
                            <input 
								type="number" min="0"
								class="fundsBoxes"
                                value={this.state.depAmount}
                                onChange = {this.onChangeDep}
                            />
                            <input type="submit" class="fundsButton" value='Deposit'></input>
                        </form>
                    </div>
                    
                    <div>
                        <form onSubmit={this.onSubmitWith}>
                            <label for="">Widthdraw Funds</label><br/>
                            <input 
								type="number" min="0"
								class="fundsBoxes"

                                value={this.state.withAmount}
                                onChange = {this.onChangeWith} />
                            <input type="submit" class="fundsButton" value='Withdraw'></input>
                        </form>
                    </div>
					<br/>
					<table>
							<thead>
								<th>Type</th>
								<th>Amount</th>
							</thead>
                            {this.state.fundsHistory.map((item =>
                            <tr>
                                <td>{item.type}</td>
                                <td>{item.amount}</td>
                            </tr>
                            ))}
                        </table>
                </div>
                
                <div id = "stocks-owned" class = "view">
                    <form onSubmit={this.onSellOrderSubmit}>
                        <h2>Stocks Owned</h2>
                        <table>
							<thead>
								<th>Select</th>
								<th>Symbol</th>
								<th>Shares Owned</th>
								<th>Current Ask</th>
								<th>Current Bid</th>
							</thead>
                            {this.state.stockPortfolio.map((item =>
                            <tr>
                                <td><input type="radio" name="Sell" value={item.stockID} onChange = {this.onChangeOrderStock}/></td>
                                <td><a href={"http://localhost:3000/search?stock="+item.stockID}>{item.stockID}</a></td>
                                <td>{item.shares}</td>
                                <td>{item.currentAsk}</td>
                                <td>{item.currentBid}</td>
                            </tr>
                            ))}
                        </table>

                        <div>
                            <br/><label>Enter Sell Price/Share: $</label><br/>
                            <input type="number" min="0"
                                id="sellPrice-input"
                                value={this.state.price}
                                onChange = {this.onChangeOrderPrice}
                            /> 
                            <br/>
                            <label>Enter # Shares: </label><br/>
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
					<form onSubmit={this.onCancelOrder}>

                        <h2>Unprocessed Buy Orders</h2>
                        <table>
							<thead>
								<th>Select</th>	
								<th>Symbol</th>
								<th>Type</th>
								<th>Price per share</th>
								<th>Shares</th>
								<th>Fulfilled</th>
							</thead>
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
						<br></br>
                        <input type="submit" value='Cancel Order'></input>
					                        
                        <h2>Unprocessed Sell Orders</h2>
                        <table>
							<thead>
								<th>Select</th>	
								<th>Symbol</th>
								<th>Type</th>
								<th>Price per share</th>
								<th>Shares</th>
								<th>Fulfilled</th>
							</thead>
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
						<br></br>
                        <input type="submit" value='Cancel Order'></input>
					</form>

				</div>



                <div id = "watchlist" class = "view">
                    <h2>Watchlist</h2>
                    <SelectSearch 
                    options={this.state.parsedLists} 
                    search
                    onChange = {this.handleListChange}
                    name="stocks" 
                    placeholder="Select a watchlist" />

                    <table>
						<thead>
							<th>Symbol</th>
							<th>Name</th>
							<th>Current Ask</th>
							<th>Current Bid</th>
						</thead>
                        {this.state.WLitems.map((item,index)=>(
                            <tr>
                                <td><a href={"http://localhost:3000/search?stock="+item.stockID}>{item.stockID}</a></td>
                                <td>{item.name}</td>
                                <td>{item.currentAsk}</td>
                                <td>{item.currentBid}</td>
                              
                            </tr>
                        ))}
                    </table>
                </div>
                
				<div id = "event-subscriptions" class = "view">
					<form onSubmit={this.onCancelES}>
                        <h2>Event Subscriptions</h2>
                        <table>
							<thead>
								<th>Select</th>
								<th>Symbol</th>
								{/* <th>$ / Share</th> */}
								<th>AVG price paid</th>
								<th>Current value</th>
								<th>Trigger</th>
							</thead>
                            {this.state.eventSubscriptions.map((item =>
                                <tr>
                                    <td><input type="radio" name="ES" value={[item.stockID, item.subscriptionID]} onChange = {this.onSelectRemove}/></td>
                                    <td>{item.stockID}</td>
                                    <td>$0</td>
                                    <td>0</td>
                                    <td>{item.value}</td>
                                </tr>
                            ))}
                        </table>
						<br></br>
                        <input type="submit" value='Cancel Subscription'></input>
					</form>  
				</div>    
                
				<div id = "sellhistory" class = "view">
					<br/>
					<b>User Sell Transaction History</b>
					<br/>
					<table>
						<thead>
							<th>Day</th>
							<th>Sell Price</th>
							<th>Seller Ask</th>
							<th>Shares</th>
							<th>Bidder Username</th>
							<th>Seller Username</th>      
						</thead>
						{this.state.fullfilledSOrders.map((item,index)=>(
							<tr>
								<td>{item.day}</td>
								<td>{item.soldFor}</td>
								<td>{item.asked}</td>
								<td>{item.shares}</td>
								<td>{item.buyerName}</td>
								<td>{item.sellerName}</td>
							</tr>
						))}                    
					</table>

					<br/>
					<b>User Buy Transaction History</b>
					<br/>
					<table>
						<thead>
							<th>Day</th>
							<th>Sell Price</th>
							<th>Seller Ask</th>
							<th>Shares</th>
							<th>Bidder Username</th>
							<th>Seller Username</th>      
						</thead>
						{this.state.fullfilledBOrders.map((item,index)=>(
							<tr>
								<td>{item.day}</td>
								<td>{item.soldFor}</td>
								<td>{item.asked}</td>
								<td>{item.shares}</td>
								<td>{item.buyerName}</td>
								<td>{item.sellerName}</td>
							</tr>
						))}                    
					</table>
				</div>
            </div>
        </div>
        )
    }
}

