const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    stockFullName: {type: String, required: true, unique: true },
    stockAbbreviation: {type: String, required: true },
    eventSubscriptions: [{
        subscriptionID: {type: String, required: true},
        userID: { type: String, required: true },
        parameter: {type: String, required: true }, //we have to figure out the structure for eventSubscription parameters
        value: {type: Number, required: true},
        triggerOrder: {type: Boolean, required: true} //automated trading thing, unstructured
     }], 
    sellOrders: [{
        orderID: {type: String, required: true},
        orderPlacement: {type: Number, required: true},
        userID: { type: String, required: true },
        shares: {type: Number, required: true},
        price: {type: Number, required: true},
    }],
    buyOrders: [{
        orderID: {type: String, required: true},
        orderPlacement: {type: Number, required: true},
        userID: { type: String, required: true },
        shares: {type: Number, required: true},
        price: {type: Number, required: true}
    }]
}, {
    timestamps: true, //idk what this does ngl>???
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;