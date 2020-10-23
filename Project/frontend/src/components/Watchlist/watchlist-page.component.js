import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./watchlist.css"
import helper from "./helper.js"



export default class Watchlist extends Component{
    constructor(props){
        super(props);
        this.onAddList = this.onAddList.bind(this);
        // this.onRemoveStock = this.onRemoveStock.bind(this);
        // this.onRemoveList = this.onRemoveList.bind(this);
        this.onSelectList = this.onSelectList.bind(this);
        this.onSelectStock = this.onSelectStock.bind(this);
        this.handleInput= this.handleInput.bind(this);

    
        this.state = {
            userID: "5f890ebbbb89e66e947f5652",
            watchlistCollection: [],
            parsedLists: [],
            stockItems:[],
            listname: null,
            stockID: null,
            
        }
    }
    componentDidMount() {
        console.log('reloaded');
        axios.get('http://localhost:5000/users/' + this.state.userID + '/watchlist') //dummy user ID in place
            .then(response => {
                let list = helper.parseListItems(response.data);
                let stocks = helper.getStockItems(response.data);

                this.setState({
                    watchlistCollection: response.data,
                    parsedLists:list
                 
                })
                // console.log(response.data)

              
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }




    onSelectList(e){
        console.log(e.target.value.name)
    }

// change to onRemove

    onSelectStock(e){
    this.setState({
        //    editAmount: e.target.value.split(",")[0],
        stockID: e.target.value.split(",")[0],
        // editSubID: e.target.value.split(",")[2]
    });
    console.log(e.target.value.split(",")[0].watchlist);
        
    }
    onRemoveStock(e){
        e.preventDefault();   

   
        // console.log(newArray);
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/update/5f890ebbbb89e66e947f5652/watchlist/update/remove', //dummy user
            data: {
                name: this.state.listname,
                stockID: this.state.stockID
            }
        })
        .then(res => {
            console.log(res.data)
            //i want a function for this.
            alert('Watchlist Item Removed!')

            //window.location.reload(false);
        })
        .catch(res => {
            console.log(res)
            alert('Something went wrong! Please try again later.')
        });
    }


    handleInput(e){
        this.setState({
           listname : e.target.value
        });
   
    }


    onAddList(e){
        e.preventDefault();   
        // console.log(this.state.listname)


       axios({
            method: 'post',
            url: 'http://localhost:5000/users/5f890ebbbb89e66e947f5652/watchlist/add', //dummy user
            data: {
                name: this.state.listname,
            }
        })
        .then(res => {
            console.log(res.data)
            //i want a function for this.
            alert('New Watchlist Added!')

            //window.location.reload(false);
        })
        .catch(res => {
            console.log(res)
            alert('Something went wrong! Please try again later.')
        }); 


    }

    

    render(){
        // console.log("watchlist");
        // this.state.parsedLists.map(item=>{
        //     console.log(item.stockID);

        // });

        return(

            <div>
                <Navbar/>
                <h2>Your Watchlists</h2>

                <div id = "select">
                <form onSubmit = {this.onAddList}>
                    <label for = "lists">Select</label>
                    <select name = "lists" value = {this.onSelectList}>
                    {this.state.parsedLists.map((item,index)=>(
                        <option value = {item.name}>{item.name}</option>

                    ))}

                    </select>
                

              
                <button id = "submit">Create List</button>

                <input type = "text" onChange = {this.handleInput}/>

                </form>
                </div>

            
                <div className = "watchlist">
                    <h2></h2>                    
                    <table>
                        <th>Remove</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Shares Owned</th>
                        <th>AVG price paid</th>
                        <th>Current value</th>
                        {this.state.stockItems.map((item,index)=>(
                            <tr>
                                <td><input type="checkbox" name="Remove" value={[item.stockID]} onChange = {this.onSelectStock}/></td>
                                <td>{item.stockID}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.shares}</td>
                                <td>False</td>
                            </tr>
                        ))}
                    </table>

                <button onClick ={this.onRemoveStock}>Remove Stock</button>            
                <button>Delete Entire List</button>            
                </div>


            </div>


        );


    }

}