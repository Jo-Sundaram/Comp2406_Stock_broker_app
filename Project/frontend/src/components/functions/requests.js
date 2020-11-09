// Importing combination 
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

  
const requests = {


    generateSellID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '/info') //dummy user ID in place
        
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
        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.buyOrders)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
		
		console.log(dataPromise);
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
        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '/info') //dummy user ID in place
        
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
    },

    getHighestAsk: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.sellOrders)

        console.log(dataPromise);


        var highestAsk = 'N/A';
        for (var key in dataPromise){
            if(dataPromise[key].price > highestAsk || highestAsk == 'N/A')
            {
                highestAsk = dataPromise[key].price;
            }
            
        }

        return highestAsk;
    },

    getLowestBid: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.buyOrders)

        console.log(dataPromise);


        var lowestBid = 'N/A';
        for (var key in dataPromise){
            if(dataPromise[key].price > lowestBid || lowestBid == 'N/A')
            {
                lowestBid = dataPromise[key].price;
            }
        }

        return lowestBid;
    },

    parseListItems: async function(userID){
        const promise = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.watchlistCollection)

        var parsedList = [];

        console.log(dataPromise);

        for(var key in dataPromise){
            parsedList.push({'name': dataPromise[key].name, 'value': dataPromise[key].name});
        }

		return parsedList;
		console.log('');
    },


    parseStockItems: async function(){
        var list = []

        const promise = axios.get('http://localhost:5000/stocks/') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data);

        for(var key in dataPromise){
            list.push({'name':[dataPromise[key].stockFullName," (" + dataPromise[key].symbol + ")"], 'value': dataPromise[key].symbol})

        }

        console.log("newList");
        console.log(list);


        return list;
    },


    getHistory: async function(stockID){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID+'/history') //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data);

        return dataPromise;
	},

	getSomeHistory: async function(stockID, startday, endday){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID+'/history' + '?startday=' + startday + '&endday=' + endday) //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data);

        return dataPromise;
	},
	
	getValueAllHistory: async function(stockID){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '?startday=' + 0); //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data);

        return dataPromise;
	},
	
	getValueSomeHistory: async function(stockID, startday, endday){

		const promise = axios.get('http://localhost:5000/stocks/'+stockID + '?startday=' + startday + '&endday=' + endday); //dummy user ID in place
		const dataPromise = await promise.then((response) => response.data);

		return dataPromise;
		
	}
}
  
// Exporting the component 
export default requests; 