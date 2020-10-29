// const router = require('express').Router();
const express = require("express");
let Stock = require('../models/stock.model');
const app = express.Router();

app.get("/", async(req,res) => {
    const stocks = await Stock.find();
    res.send(stocks);
});

app.get("/:stockAbbreviation", async(req,res) => {
    const stock = await Stock.findOne({'stockAbbreviation' : req.params.stockAbbreviation});
    res.send(stock);
});

app.get("/:stockAbbreviation/history", async(req,res) => {
    const stock = await Stock.findOne({'stockAbbreviation' : req.params.stockAbbreviation});
    res.send(stock.history);
});

// router.route('/add').post((req, res) => {
//     const stockFullName = req.body.stockFullName;
//     const stockAbbreviation = req.body.stockAbbreviation;
//     const eventSubscriptions = req.body.eventSubscriptions;
//     const sellOrders = req.body.sellOrders;
//     const buyOrders = req.body.buyOrders;

//     const newStock = new Stock({
//         stockFullName,
//         stockAbbreviation,
//         eventSubscriptions,
//         buyOrders,
//         sellOrders
//     });

//     newStock.save()
//         .then(() => res.json('Stock added to the database'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// //update stock by abbreviation
// router.route('/update/:stockAbbreviation').post((req, res) => {
//     //console.log('here');
//     Stock.findOneAndUpdate({'stockAbbreviation' : req.params.stockAbbreviation},{$set:req.body},{new:true},  function(err, result){
//         if(err || result == null){
//             console.log("there is an error");
//             console.log(err);
//         }
//         //console.log("RESULT: " + result);
//         res.send('Done')
//     });
// });
app.post("/update/:stockAbbreviation", function(req,res){
    Stock.findOneAndUpdate(req.params.stockAbbreviation, {$set:req.body},{new:true}, function(err){
        if(err){
            return res.status(400).send(err);
        }
        res.json({success: true});
    });
});


module.exports = app;