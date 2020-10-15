import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./account.css"
import Navbar from "../NavBar/navbar.component";

export default class Account extends Component{

    render(){
        return(
            <div>
                <Navbar/>

                <div className = "userInfo">
                    <h1>Your Account</h1>

                    <h3>Name: </h3>
                    <h3>Email: </h3>
                    <h3>Name: </h3>

                </div>

                <div className = "change-credentials">
                    <h3 >Change Password</h3>
                    <div className="change-pass-email">
                        <label ><b>Email</b></label><br></br>
                        <input type="text" class="logregfield" placeholder="Enter Email"></input>
                    </div>

                    <div className="change-pass-email">
                        <label ><b>New Password</b></label><br></br>
                        <input class="logregfield" placeholder="Enter Password"></input>
                    </div>
                    <div className="change-pass-email">
                        <label ><b>Confirm Password</b></label><br></br>
                        <input class="logregfield" placeholder="Enter Password"></input>
                    </div>
                </div>

            </div>

        );
    }
}