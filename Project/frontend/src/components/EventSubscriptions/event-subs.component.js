import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./event-subs.css"
import Navbar from "../NavBar/navbar.component";

export default class EventSubs extends Component{

    constructor(props){
        super(props);
        // this.onAdd = this.onAdd.bind(this);
        // this.onRemove = this.onRemove.bind(this);
        this.onEdit = this.onEdit.bind(this);

    
        this.state = {
            userID: "5f890ebbbb89e66e947f5652",
            eventSubscriptions: [],
            stockID: 'IBM',
            esParameter: "",
            esAmount: "15",
            editAmount :null

        }
    }


    componentDidMount() {
        console.log('reloaded');
        axios.get('http://localhost:5000/users/' + this.state.userID + '/ES') //dummy user ID in place
            .then(response => {

                this.setState({
                    eventSubscriptions: response.data,
                })
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSelectEdit(e){
       console.log(e.target.value)

    }

    onEdit(e){
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:5000/users/'+this.state.userID+'/update/ES/update', //dummy user
            data: {
                subscription: "5f9259473cfa7125e091a3d5",
                stockID: this.state.stockID,
                parameter: this.state.esParameter,
                value: this.state.esAmount,
                triggerOrder: 0
            }
        })



    }

    render(){
        return(

            <div>
                <Navbar/>
                <h2>Your Event Subscriptions</h2>
                <div className = "list-container">
                <div id = "event-subscriptions" class = "view">
                    <h2>Event Subscriptions</h2>
                    <table>
                        <th>Select</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Current value</th>
                        <th>Trigger</th>
                        {this.state.eventSubscriptions.map((item =>
                            <tr>
                                <td><input type="radio" name="select" value={[item.value]} onChange = {this.onSelectEdit}/></td>
                                <td>{item.stockID}</td>
                                <td>{item.name}</td>
                                <td>{item.value}</td>

                                <td>False</td>
                            </tr>
                            ))}
                    </table>
                    <button onChange = {this.onEdit}>Edit</button> 
                    <form onSubmit={this.onEsSubmit}>
                           
                                <b>Edit Subscription</b><br/>
                                <label>Select Parameter</label>
                                <select name="select" id = "select-params" value={this.state.parameter} onChange = {this.onChangeEsParameter}>
                                    <option value="incPrcnt">+ %</option>
                                    <option value="decPrcnt">- %</option>
                                    <option value="incDollar">+ $</option>
                                    <option value="decDollar">- $</option>
                                </select> <br/>

                                <label>Enter amount</label>
                                <input type="number" min="0" 
                                    required class="logregfield"
                                    value={this.state.parameter} 
                                    onChange = {this.onChangeEsAmount}
                                    placeholder="%10"/>
                          
                            <div>
                            <input type="submit" value='Place Event Subscription'></input>
                            </div>
                        </form>
                </div>    

               
                  
                </div>
                
            </div>
        );
    }
}