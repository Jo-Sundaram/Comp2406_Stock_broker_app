
import React, { Component } from 'react';
import axios from 'axios';
    
export default class LoginUser extends Component{
    render() {
        return (
        <div class="userinputform">
        <h2>Sign In</h2>
        <div className="formgroup">
            <label><b>Email</b></label><br></br>
            <input type="text" class="logregfield" placeholder="Enter Email"></input>
        </div>

        <div className="formgroup">
            <label><b>Password</b></label><br></br>
            <input type="text" class="logregfield" placeholder="Enter Password"></input>
        </div>

        <label>
            <small><input type="checkbox" checked="checked" name="remember"></input> Remember Me</small>
        </label><br></br>

        <input type="button" class="submitform" onClick="location.href='index.html'" value='Login'></input><br></br>
        
        <div style={{backgroundColor: "#f1f1f1", padding: "16px"}}>
            <small>
                Forgot <a href="#">Password?</a>
            </small>
    
            <small style={{float: "right"}}>
                Don't have an account? <Link to="/register">Login</Link>
            </small>
        </div>

        </div>
        )
    }
}