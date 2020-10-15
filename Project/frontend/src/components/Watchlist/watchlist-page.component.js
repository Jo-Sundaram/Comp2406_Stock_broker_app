import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./watchlist.css"
import Navbar from "../NavBar/navbar.component";
import Watchlist from "./watchlist.component";

export default class Account extends Component{

    render(){
        return(

            <div>
                <Navbar/>
                <h2>Your Watchlists</h2>
                <div className = "list-container">
                    <Watchlist/>
                    <Watchlist/>
                    <Watchlist/>
                    <Watchlist/>





                </div>




            </div>


        );


    }

}