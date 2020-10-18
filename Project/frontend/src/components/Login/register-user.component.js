import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './logreg.css';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
            userFunds: 0,
            watchlist: [],
            notifications: [],
            eventSubscriptions: [],
            stockPortfolio: [],
            unpBuyOrders: [],
            unpSellOrders: [],
            pBuyOrders: [],
            pSellOrders: [],
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value      
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            userFunds: this.state.userFunds,
            watchlist: this.state.watchlist,
            notifications: this.state.notifications,
            eventSubscriptions: this.state.eventSubscriptions,
            stockPortfolio: this.state.stockPortfolio,
            unpBuyOrders: this.state.unpBuyOrders,
            unpSellOrders: this.state.unpSellOrders,
            pBuyOrders: this.state.pBuyOrders,
            pSellOrders: this.state.pSellOrders
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        window.location = '/login';
    }

    render() {
        return (
        <div class="userinputform">
            <h2 className="text">Register</h2>
            <form onSubmit={this.onSubmit}>
                <div className="formgroup">
                    <label className="text"><b>Email</b></label>
                    <input type="text" 
                        required class="logregfield"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        placeholder="Enter Email" 
                    />
                </div>
        
                <div className="formgroup">
                    <label className="text"><b>Username</b></label>
                    <input type="text" 
                        required class="logregfield"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        placeholder="Enter Username" 
                    />
                </div>
        
                <div className="formgroup">
                    <label className="text"><b>Password</b></label>
                    <input type="text" 
                        required class="logregfield"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        placeholder="Enter Password" 
                    />
                </div>

                <div className="formgroup">
                    <input type="submit" class="submitform" value='Sign Up'></input><br></br>
                </div>
            </form>
    
            <div style={{backgroundColor:"#2f2f3b", padding: "16px"}}>
    
                <small style={{float: "right"}} className="text">
                    Have an account? <Link to="/login" className="text">Sign In!</Link>
                </small>
            <br></br>
            </div>
            
            
        </div>
        
        )
    }
}