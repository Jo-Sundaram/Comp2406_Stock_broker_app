// Importing combination 
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

  
const requests = {
    getStockSellOrders: function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID) //dummy user ID in place
        
        const dataPromise = promise.then((response) => response.data.sellOrders)
        
        return dataPromise
    }
}
  
// Exporting the component 
export default requests; 