const router = require('express').Router();
let Stock = require('../models/stock.model');

router.route('/').get((req, res) => {
    Stock.find()
        .then(stocks => res.json(stocks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const stockFullName = req.body.stockFullName;
    const stockAbbreviation = req.body.stockAbbreviation;
    const eventSubscriptions = req.body.eventSubscriptions;
    const sellOrders = req.body.sellOrders;
    const buyOrders = req.body.buyOrders;

    const newStock = new Stock({
        stockFullName,
        stockAbbreviation,
        eventSubscriptions,
        buyOrders,
        sellOrders
    });

    newStock.save()
        .then(() => res.json('Stock added to the database'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//gets stock for abbreviation provided
router.route('/:stockAbbreviation').get((req, res) => {
    Stock.findOne({'stockAbbreviation' : req.params.stockAbbreviation})
    .then(stock => res.json(stock))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update stock by abbreviation
router.route('/update/:stockAbbreviation').post((req, res) => {
    //console.log('here');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{$set:req.body},{new:true},  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});

router.route('/:id').post((req, res) => {
    Stock.findById(req.params.id)
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json('Error:  ' + err));
});

//add event subscription to stock.
router.route('/update/ES/:stockAbbreviation').post((req, res) => {
    //console.log('here');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{
        $push: {eventSubscriptions: {
            subscriptionID: req.body.subscriptionID,
            userID: req.body.userID,
            stockID: req.body.stockID,
            parameter: req.body.parameter,
            triggerOrder: req.body.triggerOrder
        }}
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});

//place buy order
router.route('/update/buyorder/:stockAbbreviation').post((req, res) => {
    console.log('here');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{
        $push: {buyOrders: {
            orderID: req.body.orderID,
            userID: req.body.userID,
            shares: req.body.shares,
            price: req.body.price
        }}
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});

//place sell order
router.route('/update/sellorder/:stockAbbreviation').post((req, res) => {
    console.log('...');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{
        $push: {sellOrders: {
            orderID: req.body.orderID,
            userID: req.body.userID,
            shares: req.body.shares,
            price: req.body.price
        }}
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});

//delete a sell order
router.route('/delete/sellorder/:stockAbbreviation').post((req, res) => {
    //console.log('here');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{
        $pull: {sellOrders: {
            orderID: req.body.orderID
        }}
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});

//delete a buy order
router.route('/delete/buyorder/:stockAbbreviation').post((req, res) => {
    console.log('!!!!');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{
        $pull: {buyOrders: {
            orderID: req.body.orderID
        }}
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});


module.exports = router;