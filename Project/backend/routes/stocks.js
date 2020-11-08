// const router = require('express').Router();
const express = require("express");
let Stock = require('../models/stock.model');
const app = express.Router();

/* app.get("/", async(req,res) => {
    const stocks = await Stock.find();
    res.send(stocks);
}); */

app.get("/", async(req,res)=>{

    console.log(req.query);
    console.log(Object.keys(req.query).length);
    if(Object.keys(req.query).length==0){
        const stocks = await Stock.find();
        res.send(stocks);
    }

    else {
        let symbol = '';
        let minprice =0;
        let maxprice = Number.MAX_SAFE_INTEGER;
   
        req.query.hasOwnProperty('symbol')?symbol=req.query['symbol']:''
        req.query.hasOwnProperty('minprice')?minprice= parseInt(req.query['minprice']):0;
        req.query.hasOwnProperty('maxprice')?maxprice = req.query['maxprice']:Number.MAX_SAFE_INTEGER;

        var stocks;
        if(symbol!=''){
            stocks = await Stock.find({
            'stockAbbreviation': {'$regex': symbol, '$options': 'i'},
            'currentAsk':{$gte:minprice, $lte: maxprice},
           });
        }else{
                stocks = await Stock.find({
                'currentAsk':{$gte:minprice, $lte: maxprice},
            });
        }
       
        if(!stocks){
            res.send("No stock symbols found");
        }else{
                res.send(stocks)
        }
    }

});

app.get("/:stockAbbreviation", async(req,res) => {

	console.log(req.query);
    console.log(Object.keys(req.query).length);
    if(Object.keys(req.query).length==0){
        const stock = await Stock.findOne({
          'stockAbbreviation' : req.params.stockAbbreviation
        })
        .then((stock)=>{
            res.json({
                lowestAsk: stock.currentAsk,
                highestBid: stock.currentBid,
                highestAsk: stock.currHighestAsk,
                lowestBid: stock.currLowestBid
		    })
        })
        .catch((err)=>{
            res.send("No data for this stock");
        });
        //const stocks = await Stock.find();
        
	}
	else{
        let startday = 0;
        let endday = 0;

		let request = []
   
        req.query.hasOwnProperty('startday')?startday= parseInt(req.query['startday']):0;
		req.query.hasOwnProperty('endday')?endday = parseInt(req.query['endday']):0;
        
        const stock = await Stock.findOne({
            'stockAbbreviation' : req.params.stockAbbreviation
          })
          .then((stock)=>{
		if(endday == 0 || endday<startday){
			for(let i in stock.dailyHistory){
				if(stock.dailyHistory[i].day >= startday){
					request.push(stock.dailyHistory[i])
				}
			}
		}
		else if(endday>startday){
			for(let i in stock.dailyHistory){
				if(stock.dailyHistory[i].day >= startday && stock.dailyHistory[i].day <= endday){
					request.push(stock.dailyHistory[i]);
				}
			}
		}
		else if (endday == startday){
			for(let i in stock.dailyHistory){
				if(stock.dailyHistory[i].day == startday){
					request.push(stock.dailyHistory[i]);
				}
			}
        }
        res.json(request);
    })
    .catch((err)=>{
        res.send("Could not fetch data for stock");
    })
		
	}
    //res.send(stock);
});


app.get("/:stockAbbreviation/history", async(req,res) => {
    if(Object.keys(req.query)==0){
        const stock = await Stock.findOne({'stockAbbreviation' : req.params.stockAbbreviation})
        .then((stock)=>{
            res.send(stock.history);
        })
        .catch((err)=>{
            res.send("No data for this stock");
        });
        return;
       
    }else{

        let startday = 0;
        let endday = Number.MAX_SAFE_INTEGER; 
        var request=[];
        console.log(req.query);

        req.query.hasOwnProperty('startday') ? startday =parseInt(req.query['startday']) : 0;
        req.query.hasOwnProperty('endday') ? endday = parseInt(req.query['endday']) : Number.MAX_SAFE_INTEGER; 

        const stock = await Stock.findOne({
            'stockAbbreviation':req.params.stockAbbreviation,
            })
            .then((stock)=>{
                if(endday == 0 || endday<startday){
                    for(let i in stock.dailyHistory){
                        if(stock.dailyHistory[i].day >= startday){
                            request.push(stock.dailyHistory[i])
                        }
                    }
                }
                else if(endday>startday){
                    for(let i in stock.dailyHistory){
                        if(stock.dailyHistory[i].day >= startday && stock.dailyHistory[i].day <= endday){
                            request.push(stock.dailyHistory[i]);
                        }
                    }
                }
                else if (endday == startday){
                    for(let i in stock.dailyHistory){
                        if(stock.dailyHistory[i].day == startday){
                            request.push(stock.dailyHistory[i]);
                        }
                    }
                }
                res.json(request);
            })
            .catch((err)=>{
                res.send("Could not fetch data for stock");
            })
    }
});



app.get("/:symbol/info", async(req,res) => {
    const stock = await Stock.findOne({'stockAbbreviation' : req.params.symbol})
            .then((stock)=>{
                res.send(stock);
            })
            .catch((err)=>{
                res.send("Stock not found")
            });

});


app.post("/add",function(req,res){

    const stockFullName = req.body.stockFullName;
    const stockAbbreviation = req.body.stockAbbreviation;
    const openingAsk = req.body.openingAsk;
    const openingBid = req.body.openingBid;
    const currentAsk = req.body.currentAsk;
    const currentBid = req.body.currentBid;
    const currHighestAsk = req.body.currHighestAsk;
    const currLowestBid = req.body.currLowestBid;


    const newStock = new Stock({
        stockFullName,
        stockAbbreviation,
        openingAsk,
        openingBid,
        currentAsk,
        currentBid,
        currHighestAsk,
        currLowestBid

    });

    newStock.save()
        .then(() => res.json('Stock added to the database'))
        .catch(err => res.status(400).json('Error: ' + err));

})



app.post("/update/:stockAbbreviation", function(req,res){
    Stock.findOneAndUpdate(req.params.stockAbbreviation, {$set:req.body},{new:true}, function(err){
        if(err){
            return res.status(400).send(err);
        }
        res.json({success: true});
    });
});


module.exports = app;