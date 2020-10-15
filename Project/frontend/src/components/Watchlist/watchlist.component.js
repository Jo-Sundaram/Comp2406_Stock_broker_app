import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./watchlist.css"

export default class Account extends Component{

    render(){
        return(

            <div className>
                <div className = "watchlist">
                                          
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
                        </tr>    <tr>
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