const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: {type: String, required: true, unique: true, trim: true }, //there is most likely a JS library that can verify an email being legitimate or not
    password: {type: String, required: true },
    userFunds: {type: Number, required: true },
     //we need to design a function that allows user/remove funds from their account
    
    stockPortfolio: [ {
        stockID: { type: String, required: true },
        stockName: {type: String, required: true },
        numberOfShares: {type: Number, required: true}

    }],
     watchlist: [ {
        stockID: { type: String, required: true }
    }],

    notifications: [{
        idontknow: { type: String, required: true } //////we have to figure out the structure for a notification object
    }],

    eventSubscriptions: [{ //so users can edit their own subscriptions/view their own subscriptions
        stockID: { type: String, required: true },
        parameter: {type: String, required: true },
        value: {type: Number, required: true}, //we have to figure out the structure for eventSubscription parameters
        triggerOrder: {type: Boolean, required: true} //automated trading thing, unstructured
    }], 

    unpBuyOrders: [{  //so users can view/edit(?) their own buy/sell orders
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true} //users bid
    }], 

    unpSellOrders: [{
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true} //users price to sell
    }],

    pBuyOrders: [{  
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true} //users bid
    }], 

    pSellOrders: [{
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true} //users price to sell
    }]
    
},{
    timestamps: true, //idk what this does ngl>???
});

const User = mongoose.model('User', userSchema);

User.init().then(() => {
});

module.exports = User;