import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
    
export default class Register extends Component{

    render() {
        return (
        <div class="userinputform">
            <h2>Register</h2>
            <div className="formgroup">
                <label><b>Email</b></label>
                <input type="text" class="logregfield" placeholder="Enter Email"></input>
            </div>
    
            <div className="formgroup">
                <label><b>Username</b></label>
                <input type="text" class="logregfield" placeholder="Enter Username"></input>
            </div>
    
            <div className="formgroup">
                <label><b>Password</b></label>
                <input type="text" class="logregfield" placeholder="Enter Password"></input>
            </div>
    
            <div className="formgroup">
                <label><b>Confirm Password</b></label>
                <input type="text" class="logregfield" placeholder="Re-Enter Password"></input>
            </div>

            <div className="formgroup">
                <Link to="/login">
                <input type="button" class="submitform" value='Sign Up'></input></Link><br></br>
            </div>
    
            <div style={{backgroundColor:"#f1f1f1", padding: "16px"}}>
    
                <small style={{float: "right"}}>
                    Have an account? <Link to="/login">Sign In!</Link>
                </small>
            <br></br>
            </div>
            
            
        </div>
        
        )
    }
}
