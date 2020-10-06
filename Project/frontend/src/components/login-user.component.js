
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './css/logreg.css';

    
export default class LoginUser extends Component{
    render() {
        return (
        <div class="userinputform">
        <h2 className="text">Sign In</h2>
        <div className="formgroup">
            <label className="text"><b>Email</b></label><br></br>
            <input type="text" class="logregfield" placeholder="Enter Email"></input>
        </div>

        <div className="formgroup">
            <label className="text"><b>Password</b></label><br></br>
            <input type="text" class="logregfield" placeholder="Enter Password"></input>
        </div>

        <label>
            <small className="text"><input type="checkbox" checked="checked" name="remember"></input> Remember Me</small>
        </label><br></br>

        <Link to="/home"><input type="button" class="submitform" value='Login'></input></Link><br></br>
        
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