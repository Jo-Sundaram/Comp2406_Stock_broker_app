// Importing combination 
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

  
const requests = {


    generateSellID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID) //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.sellOrders)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise2 = await promise2.then((response) => response.data.unpSellOrders)
        
        var valid = 1;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }


        console.log(dataPromise2);
        while(valid){
            const found = dataPromise.some(el => el.orderID == result);
            const found2 = dataPromise2.some(el => el.orderID == result);
            if(!found && !found2){
                valid = 0;
            }
            else{
                result ='';
                for ( var i = 0; i < 12; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
        }
        
        
        return result;
    },

    generateBuyID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID) //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.buyOrders)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise2 = await promise2.then((response) => response.data.unpBuyOrders)
        
        var valid = 1;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        console.log(dataPromise2);
        while(valid){
            const found = dataPromise.some(el => el.orderID == result);
            const found2 = dataPromise2.some(el => el.orderID == result);
            if(!found && !found2){
                valid = 0;
            }
            else{
                result ='';
                for ( var i = 0; i < 12; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
        }
        
        
        return result;
    },

    generateESID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID) //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.eventSubscriptions)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise2 = await promise2.then((response) => response.data.eventSubscriptions)
        
        var valid = 1;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        console.log(dataPromise2);
        while(valid){
            const found = dataPromise.some(el => el.subscriptionID == result);
            const found2 = dataPromise2.some(el => el.subscriptionID == result);
            if(!found && !found2){
                valid = 0;
            }
            else{
                result ='';
                for ( var i = 0; i < 12; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
        }
        
        return result;
    }
}
  
// Exporting the component 
export default requests; 