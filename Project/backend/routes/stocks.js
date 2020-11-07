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



/*     const stocks = await Stock.find({'stockAbbreviation': { '$regex': req.body.symbol, '$options': 'i'}},{})
    if(!stocks){
        res.send("No stock symbols found");
    }else{
            res.send(stocks)
    }
 */

});

app.get("/:stockAbbreviation", async(req,res) => {
	const stock = await Stock.findOne({'stockAbbreviation' : req.params.stockAbbreviation});

	console.log(req.query);
    console.log(Object.keys(req.query).length);
    if(Object.keys(req.query).length==0){
        //const stocks = await Stock.find();
        res.json({
			lowestAsk: stock.currentAsk,
			highestBid: stock.currentBid,
			highestAsk: stock.currHighestAsk,
			lowestBid: stock.currLowestBid
		})
	}
	else{
        let startday = 0;
        let endday = 0;

		let request = []
   
        //req.query.hasOwnProperty('symbol')?symbol=req.query['symbol']:''
        req.query.hasOwnProperty('startday')?startday= parseInt(req.query['startday']):0;
		req.query.hasOwnProperty('endday')?endday = parseInt(req.query['endday']):0;
		
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
	}
    //res.send(stock);
});

app.get("/:stockAbbreviation/history", async(req,res) => {
    const stock = await Stock.findOne({'stockAbbreviation' : req.params.stockAbbreviation})
            .then((stock)=>{
                res.send(stock.history);
            })
            .catch((err)=>{
                res.send("Stock not found")
            });

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