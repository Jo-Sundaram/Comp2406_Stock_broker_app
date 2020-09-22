const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    stockFullName: {type: String, required: true, unique: true },
    stockAbbreviation: {type: String, required: true },
    eventSubscriptions: [{
        userID: { type: String, required: true },
        stockID: { type: String, required: true },
        parameters: {type: String, required: true }, //we have to figure out the structure for eventSubscription parameters
        triggerOrder: {type: Boolean, required: true} //automated trading thing, unstructured
     }], 
    sellOrders: [{
        userID: { type: String, required: true },
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    buyOrders: [{
        userID: { type: String, required: true },
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true}
    }]
}, {
    timestamps: true, //idk what this does ngl>???
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;