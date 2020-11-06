
import React, { Component } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import './logreg.css';

    
export default class LoginUser extends Component{
    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(event){
        event.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/login', //dummy user
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        })
        .then((res) => {
            if (res.data != "Wrong email or password") {
                localStorage.setItem('token', res.data.token)
                console.log(res);
                alert("Logged In Poggers.");
                
                window.location = '/home';     

            } else {
                alert("Invalid account");
                // const error = new Error(res.error);
                // throw error;
            }
        })
        .catch((err) => {
            console.log("???");
            console.error(err);
            alert("Error logging in please try again");
        });
    }


    render() {
        return (
        <div class="userinputform">
        <h2 className="text">Sign In</h2>
        <form onSubmit={this.onSubmit}>
            <div className="formgroup">
                <label className="text"><b>Email</b></label><br></br>
                <input name="name" type="email" class="logregfield" placeholder="Enter Email" onChange={this.onChangeEmail}></input>
            </div>

            <div className="formgroup">
                <label className="text"><b>Password</b></label><br></br>
                <input type="password" class="logregfield" placeholder="Enter Password" onChange={this.onChangePassword}></input>
            </div>

            <label>
                <small className="text"><input type="checkbox" checked="checked" name="remember"></input> Remember Me</small>
            </label><br></br>

            <input type="submit" class="submitform" value='Login'></input><br></br>
        </form>
        
        <div style={{backgroundColor: "#2f2f3b", padding: "16px"}}>
            <small className="text">
                Forgot <a href="#" className="text">Password?</a>
            </small>
    
            <small style={{float: "right"}} className="text">
                Don't have an account? <Link to="/register" className="text">Sign Up</Link>
            </small>
        </div>

        </div>
        )
    }
}