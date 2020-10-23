import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./account.css"
import Navbar from "../NavBar/navbar.component";

export default class Account extends Component{

    constructor(props){
        super(props);

        this.state = {
            userID: "5f890ebbbb89e66e947f5652",
            username: '',
            email: '',
        }
    }

    componentDidMount() {
        console.log('reloaded');
        axios.get('http://localhost:5000/users/' + this.state.userID) //dummy user ID in place
            .then(response => {

                this.setState({
                    username: response.data.username,
                    email: response.data.email
                })
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <Navbar/>

                <div className = "userInfo">
                    <h1>Your Account</h1>

                    <h3>Userame: {this.state.username}</h3>
                    <h3>Email: {this.state.email}</h3>

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