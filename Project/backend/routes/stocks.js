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
    console.log('here');
    Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation}, {$set:req.body},{new:true})
        .then(stock => console.log("RESULT: " + stock))
});

router.route('/:id').post((req, res) => {
    Stock.findById(req.params.id)
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json('Error:  ' + err));
});



module.exports = router;