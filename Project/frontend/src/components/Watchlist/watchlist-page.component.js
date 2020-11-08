import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./watchlist.css"
import helper from "../functions/helper.js"
import SelectSearch from 'react-select-search';


export default class Watchlist extends Component{
    constructor(props){
        super(props);
        this.onAddList = this.onAddList.bind(this);
        this.onRemoveStock = this.onRemoveStock.bind(this);
        this.onRemoveList = this.onRemoveList.bind(this);

        this.onSelectList = this.onSelectList.bind(this);
        this.onSelectStock = this.onSelectStock.bind(this);
        this.handleInput= this.handleInput.bind(this);
    
        this.state = {
            userID: "",
            watchlistCollection: [],
            parsedLists: [],
            stockItems:[],
            listname: '',
            stockID: '',
            newname: ''
            
        }
    }

    
   componentDidMount() {
    console.log('reloaded /watchlist');
    } 

    async componentWillReceiveProps(props){

        this.setState({
         	userID: props.user._id,
          	watchlistCollection: props.user.watchListCollection

        })

        var parsedList = []
        try {
            parsedList = await (helper.parseListItems(props.user._id));            
        }
          catch(e) {
            console.log('Catch an error: ', e)
        }
        
        this.setState({parsedLists:parsedList});
        console.log(parsedList);   
    }

    // on select watchlist from dropdown
    onSelectList(e){
        console.log(e.target.value.name)
    }


    onSelectStock(e){
        this.setState({
            //    editAmount: e.target.value.split(",")[0],
            stockID: e.target.value
            // editSubID: e.target.value.split(",")[2]
        });
        console.log(e.target.value);
        console.log(this.state.listname);
        
    }
    onRemoveStock(e){
        e.preventDefault();
        console.log(this.state.listname);
        axios({
            method: 'delete',
            url: 'http://localhost:5000/users/' + this.state.userID+'/watchlist/update/remove', //dummy user
            data: {
                name: this.state.listname,
                stockID: this.state.stockID
            },
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
        })
        .then(res => {
            console.log(res.data)
            alert('Watchlist Item Removed!')
            window.location.reload(false);
        })
        .catch(res => {
            console.log(res)
            alert('Something went wrong! Please try again later.')
        });
    }

    handleInput(e){
        this.setState({
           newname : e.target.value
        });
    }

    onAddList(e){
        e.preventDefault();   
        console.log(this.state.newname)
       axios({
            method: 'post',
            url: 'http://localhost:5000/users/' + this.state.userID+'/watchlist/add', //dummy user
            data: {
                name: this.state.newname
            },
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
        })
        .then(res => {
            console.log(res.data)
            //i want a function for this.
            alert('New Watchlist Added!')

            window.location.reload(false);
        })
        .catch(res => {
            console.log(res)
            alert('Something went wrong! Please try again later.')
            window.location.reload(false);
        }); 


    }

    handleChange = async (listname) => {
        this.setState({ listname });
    
        var stocksInWL = await (helper.getStockItems(this.state.userID, listname));
        this.setState({
            stockItems: stocksInWL
        });

        console.log(stocksInWL);
    }

    onRemoveList(e){
        e.preventDefault()
        console.log(this.state.listname)
        axios({
             method: 'delete',
             url: 'http://localhost:5000/users/' + this.state.userID+'/watchlist/remove', //dummy user
             data: {
                 name: this.state.listname
             },
			 headers: {
				 Authorization: "Bearer " + localStorage.getItem("token")
			 }
         })
         .then(res => {
             console.log(res.data)
             //i want a function for this.
             alert('Watchlist Removed!')
 
             window.location.reload(false);
         })
         .catch(res => {
             console.log(res)
             alert('Something went wrong! Please try again later.')
             window.location.reload(false);
         }); 



    }

    render(){
         return(

            <div>
                <Navbar/>
                <h2>Your Watchlists</h2>

                <div id = "select">
                <form onSubmit = {this.onAddList}>

                    <SelectSearch 
                    options={this.state.parsedLists} 
                    search
                    onChange = {this.handleChange}
                    name="stocks" 
                    placeholder="Select a watchlist" />

                

              
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
                                <td><input type="radio" name="Remove" value={[item.stockID]} onChange = {this.onSelectStock}/></td>
                                <td>{item.stockID}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        ))}
                    </table>

                <button onClick ={this.onRemoveStock}>Remove Stock</button>            
                <button onClick = {this.onRemoveList}>Delete Entire List</button>            
                </div>


            </div>


        );


    }

}