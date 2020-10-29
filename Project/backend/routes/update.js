const express = require("express");
let User = require('../models/user.model');
let Stock = require('../models/stock.model');
const app = express.Router();

//Event Subscriptions

app.post("/:id/:stockAbbreviation/ES/add", function(req,res){
    User.findByIdAndUpdate(req.params.id,{
        $push: {eventSubscriptions: {
            subscriptionID: req.body.subscriptionID,
            stockID: req.params.stockAbbreviation,
            parameter: req.body.parameter,
            value: req.body.value,
            triggerOrder: req.body.triggerOrder
        }}}, 
        function(err){
            if(err){
                return res.status(422).send(err);
            }
        }
    );

    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{
        $push: {eventSubscriptions: {
            subscriptionID: req.body.subscriptionID,
            userID: req.params.id,
            value: req.body.value,
            parameter: req.body.parameter,
            triggerOrder: req.body.triggerOrder
        }}}, 
        function(err){
            if(err){
                return res.status(422).send(err);
            }
        }
    );
    res.json({success: true});
});

// Edit ES
app.post("/:id/:stockAbbreviation/ES/update/:eid", function(req,res){
    User.updateMany(
        {_id: req.params.id, 'eventSubscriptions.subscriptionID' : req.params.eid},
        {$set: {'eventSubscriptions.$.value': req.body.value}},
        function(err){
            if(err){
                return res.status(422).send(err);
            }
        }
    );
    Stock.updateMany(
        {"stockAbbreviation": req.params.stockAbbreviation, 'eventSubscriptions.subscriptionID' : req.params.eid},
        {$set: {'eventSubscriptions.$.value': req.body.value}},
        function(err){
            if(err){
                return res.status(422).send(err);
            }
        }
    );
    res.json({success: true});
});

// Remove ES
app.delete("/:id/:stockAbbreviation/ES/remove/:eid", function(req,res){
    User.findByIdAndUpdate(
        {_id: req.params.id},
        {$pull: {'eventSubscriptions': {subscriptionID: req.params.eid}}},
        function(err){
            if(err){
                return res.status(422).send(err);
            }
        }
    );
    
    Stock.findOneAndUpdate(
        {"stockAbbreviation": req.params.stockAbbreviation},
        {$pull: {'eventSubscriptions': {subscriptionID: req.params.eid}}},
        function(err){
            if(err){
                return res.status(422).send(err);
            }
        }
    );
    res.json({success: true});
});

//Buy Orders

app.post("/:id/:stockAbbreviation/buyorder/add", async function(req,res){
    let funds;
    var orderTotal = req.body.price*req.body.shares;
    const user = await User.findById(
        req.params.id,
        function(err,result){
            if(err){
                return res.status(400).send(err);
            }
            funds = result.userFunds;
        }
    );

    if(funds>=orderTotal){
        User.findByIdAndUpdate(
            req.params.id,
            {$push: {unpBuyOrders : {
                orderID: req.body.orderID,
                stockID: req.params.stockAbbreviation,
                shares: req.body.shares,
                price: req.body.price
            }},
            $set:{userFunds: funds-orderTotal}},
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
            }
        );
        Stock.findOneAndUpdate(
            {'stockAbbreviation' : req.params.stockAbbreviation},
            {$push: {buyOrders: {
                orderID: req.body.orderID,
                userID: req.params.id,
                shares: req.body.shares,
                price: req.body.price
            }}},
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
            }
        );
        res.json({success: true});
    }
    else{
        return res.status(422).send({ success: false, message: 'Insufficient User Funds' });
    }
});

app.delete("/:id/:stockAbbreviation/buyorder/remove/:bid", async function(req,res){
    let funds;
    let orderTotal;
    const user = await User.findById(
        req.params.id,
        async function(err,result){
            if(err){
                return res.status(400).send(err);
            }
            funds = result.userFunds;
            for(var i in result.unpBuyOrders){
                if(result.unpBuyOrders[i].orderID = req.params.bid){
                    orderTotal = result.unpBuyOrders[i].shares*result.unpBuyOrders[i].price
                }
            }        if(this.state.cancelOrderID != null && this.state.cancelStockID !=null){
                axios.all([
                    axios({
                        method: 'delete',
                        url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.cancelStockID+'/'+this.state.cancelType+'/remove/' +this.state.cancelOrderID, //dummy user
                        data: {
                            orderID: this.state.cancelOrderID
                        }
                    })
                ])
                .then(res => {
                    console.log(res.data)
                    alert("Successfully cancelled buy order.")
                    window.location.reload(false);
                })
                .catch(res => {
                    console.log(res)
                    alert("Cancellation failed. Please try again later.");
                })
            }
        }
    );

    User.findByIdAndUpdate(
        req.params.id,
        {$pull: {unpBuyOrders: {
            orderID: req.params.bid
        }},
        $set:{userFunds: funds+orderTotal}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
        }
    );

    Stock.findOneAndUpdate(
        {'stockAbbreviation' : req.params.stockAbbreviation},{
        $pull: {buyOrders: {
            orderID: req.params.bid
        }}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
        }
    );
    res.json({success: true});
});

//Sell Orders

app.post("/:id/:stockAbbreviation/sellorder/add", async function(req,res){
    let shares;
    const user = await User.findById(
        req.params.id,
        function(err,result){
            if(err){
                return res.status(400).send(err);
            }
            for (var i in result.stockPortfolio){
                if(result.stockPortfolio[i].stockID == req.params.stockAbbreviation){
                    shares = result.stockPortfolio[i].shares;
                }
            }
        }
    );

    console.log(shares);

    if(shares>=req.body.shares){
        User.updateMany(
            {_id: req.params.id, 'stockPortfolio.stockID': req.params.stockAbbreviation},
            {$push: {unpSellOrders : {
                orderID: req.body.orderID,
                stockID: req.params.stockAbbreviation,
                shares: req.body.shares,
                price: req.body.price
            }},
            $set:{'stockPortfolio.$.shares': shares-req.body.shares}},
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
            }
        );
        Stock.findOneAndUpdate(
            {'stockAbbreviation' : req.params.stockAbbreviation},
            {$push: {sellOrders: {
                orderID: req.body.orderID,
                userID: req.params.id,
                shares: req.body.shares,
                price: req.body.price
            }}},
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
            }
        );
        res.json({success: true});
    }
    else{
        return res.status(422).send({ success: false, message: 'User does not own enough stocks.' });
    }
});

app.delete("/:id/:stockAbbreviation/sellorder/remove/:sid", async function(req,res){

    let shares;
    let sellShares;
    const user = await User.findById(
        req.params.id,
        function(err,result){
            if(err){
                return res.status(400).send(err);
            }
            for (var i in result.stockPortfolio){
                if(result.stockPortfolio[i].stockID == req.params.stockAbbreviation){
                    shares = result.stockPortfolio[i].shares;
                }
            }
            for (var i in result.unpSellOrders){
                if(result.unpSellOrders[i].orderID == req.params.sid){
                    sellShares = result.unpSellOrders[i].shares;
                }
            }
        }
    );

    User.updateMany(
        {_id: req.params.id, 'stockPortfolio.stockID': req.params.stockAbbreviation},
        {$pull: {unpSellOrders: {
            orderID: req.params.sid
        }},
        $set:{'stockPortfolio.$.shares': shares+sellShares}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
        }
    );

    Stock.findOneAndUpdate(
        {'stockAbbreviation' : req.params.stockAbbreviation},{
        $pull: {sellOrders: {
            orderID: req.params.sid
        }}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
        }
    );
    res.json({success: true});
});


module.exports = app;