import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./search.css"
import Navbar from "../NavBar/navbar.component";

export default class Search extends Component{

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
                            <div className="formgroup">
                            <b>Place Buy Order</b><br/><br/>
                                <label>Enter number of shares: </label>
                                <input type="text" class="logregfield" placeholder="50"/>
                                <label>Enter amount:  $</label>
                                <input type="text" class="logregfield" placeholder="100"/>
                                
                            </div>

                            <div>
                                <button id="place-order">Place Order</button>
                            </div>
                        
                        </div>


                        <div id = "create-event">
                            <div className="formgroup">
                                <b>Create an Event Subscription</b><br/>
                                <label>Select Parameter</label>
                                <select name="select" id = "select-params">
                                    <option value="incPrcnt">+ %</option>
                                    <option value="decPrcnt">- %</option>
                                    <option value="incDollar">+ $</option>
                                    <option value="decDollar">- $</option>
                                </select> <br/>

                                <label>Enter amount</label>
                                <input type="text" class="logregfield" placeholder="%10"/>

                            </div>
                            <div>
                            <button id="place-order">Add Subscription</button>
                            </div>
                        
                        </div>

                     </div>

                 </div>
            )
        }

}
