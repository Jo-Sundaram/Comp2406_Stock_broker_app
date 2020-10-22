import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./watchlist.css"

export default class Watchlist extends Component{
    constructor(props){
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);

    
        this.state = {
            stockID: 'DOW',
            watchlist: [],
        }
    }
    componentDidMount(){ // React life-cycle method - called befored anything displayed on page
        axios.get('http://localhost:5000/users/5f890ebbbb89e66e947f5652')
        .then(response => {
        //   if (response.data.length > 0) {
            // this.setState({
            //   users: response.data.map(user => user.username),
            //   username: response.data.username,
            //   watchlist: response.data.watchlist
              
            // })

             
        //   }

            console.log(response.data.watchlist);

        })
        .catch((error) => {
          console.log(error);
        })
    }


    onAdd(e){
        e.preventDefault();
         

        var newArray = this.state.watchlist;
        // console.log(newArray);
    
        newArray.push({
            stockID: this.state.stockID,
            
        });

        // console.log(newArray);
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/update/5f890ebbbb89e66e947f5652', //dummy user
            data: {
                watchlist: newArray,
            }
        })
        .then(res => {
            console.log(res.data)
            //i want a function for this.
            alert('Watchlist Item Added Successfully!')

            //window.location.reload(false);
        })
        .catch(res => {
            console.log(res)
            alert('Something went wrong! Please try again later.')
        });

    }
     
    onRemove(e){

    }    





    render(){
        return(

            <div className>
                <div className = "watchlist">
                    <h2></h2>                    
                    <table>
                        <th>button</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Shares Owned</th>
                        <th>AVG price paid</th>
                        <th>Current value</th>
                        <tr>
                            <button onClick = {this.onAdd}>Click</button>
                            <td>TES</td>
                            <td>Tesla</td>
                            <td>5</td>
                            <td>$40</td>
                            <td>$10</td>
                        </tr>
                        <tr>
                            <td>TES</td>
                            <td>Tesla</td>
                            <td>5</td>
                            <td>$40</td>
                            <td>$10</td>
                        </tr>
                    </table>

                </div>




            </div>


        );


    }

}