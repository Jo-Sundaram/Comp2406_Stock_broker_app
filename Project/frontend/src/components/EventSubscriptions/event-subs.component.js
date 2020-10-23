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
        this.onSelectEdit = this.onSelectEdit.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onChangeEsAmount = this.onChangeEsAmount.bind(this);

    
        this.state = {
            userID: "5f890ebbbb89e66e947f5652",
            eventSubscriptions: [],
            stockID: 'IBM',
            esParameter: "",
            esAmount: "15",

            editAmount :null,
            editStockID :null,
            editSubID :null

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
       this.setState({
        //    editAmount: e.target.value.split(",")[0],
           editStockID: e.target.value.split(",")[1],
           editSubID: e.target.value.split(",")[2]
       });
       console.log('selected');
       
  
    }

    onChangeEsAmount(e){
        this.setState({
            editAmount: e.target.value        
        });
    }

    async onEdit(e){
        e.preventDefault();
        console.log(this.state.editSubID);
        console.log(this.state.editAmount);

        if(this.state.esParameter !=null && this.state.esAmount != null && this.state.esAmount != 0){
            
            // var ID = await (requests.generateESID(this.state.stockID, this.state.userID));

            axios.all([
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/users/'+this.state.userID+'/update/ES/add', //dummy user
                    data: {
                        subscription: this.state.editSubID,
                        stockID: this.state.editStockID,
                        parameter: this.state.esParameter,
                        value: this.state.editAmount,
                        triggerOrder: 0
                    }
                }),
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/stocks/update/ES/' + this.state.stockID, //dummy user
                    data: {
                        subscription: this.state.editSubID,
                        userID: this.state.editStockID,
                        parameter: this.state.esParameter,
                        value: Number(this.state.editAmount),
                        triggerOrder: 0
                    }
                }),
            ])
            .then(res => {
                console.log(res.data)
                alert("Successfully created ES")
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert("ES creation failed. Please try again.");
            })
        }


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
                                <td><input type="radio" name="select" value={[item.value, item.stockID, item.subscriptionID]} onChange = {this.onSelectEdit}/></td>
                                <td>{item.stockID}</td>
                                <td>{item.name}</td>
                                <td>{item.value}</td>

                                <td>False</td>
                            </tr>
                            ))}
                    </table>
                    <form onSubmit={this.onEdit}>
                           
                                <b>Edit Subscription: {this.state.editStockID}</b><br/>
                                <label>Select Parameter</label>
                                <select name="select" id = "select-params" value={this.state.parameter} onChange = {this.onChangeEsParameter}>
                                    <option value="incPrcnt">+ %</option>
                                    <option value="decPrcnt">- %</option>
                                    <option value="incDollar">+ $</option>
                                    <option value="decDollar">- $</option>
                                </select> 

                                <label>Enter amount</label>
                                <input type="number" min="0" 
                                    required class="logregfield"
                                    value={this.state.parameter} 
                                    onChange = {this.onChangeEsAmount}
                                    placeholder="%10"/>
                          
                            <div>
                            <input type="submit" value='Edit Event Subscription'></input>
                            </div>
                        </form>
                </div>    

               
                  
                </div>
                
            </div>
        );
    }
}