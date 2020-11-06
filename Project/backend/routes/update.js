const express = require("express");
let User = require('../models/user.model');
let Stock = require('../models/stock.model');
const app = express.Router();
const passport = require("passport")
const jwt = require("jsonwebtoken")

let buyOrderPlacement = 0;
let sellOrderPlacement = 0;

//Event Subscriptions

app.post("/:id/:stockAbbreviation/ES/add", passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
	}
});

// Edit ES
app.post("/:id/:stockAbbreviation/ES/update/:eid",  passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
	}
});

// Remove ES
app.delete("/:id/:stockAbbreviation/ES/remove/:eid", passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
	}
});

//Buy Orders

app.post("/:id/:stockAbbreviation/buyorder/add", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
			buyOrderPlacement += 1
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
					orderPlacement: buyOrderPlacement,
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
	}
});

app.delete("/:id/:stockAbbreviation/buyorder/remove/:bid", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
	}
});

//Sell Orders

app.post("/:id/:stockAbbreviation/sellorder/add", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
			sellOrderPlacement += 1;
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
					orderPlacement: sellOrderPlacement,
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
	}
});

app.delete("/:id/:stockAbbreviation/sellorder/remove/:sid", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
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
	}
});

app.get("/:stockAbbreviation/", async function(req, res){ //i wanna change :day to a query parameter
    
    let day = parseInt(req.query['day']);

    let sellOrders = [];
    let buyOrders = [];

    let completedOrders = [];
    let uncompletedOrders = [];

    const stock = await Stock.findOne(
        {'stockAbbreviation' : req.params.stockAbbreviation},
        function(err, result){
            if(err){
                return res.status(400).send(err);
            }
            sellOrders = result.sellOrders;
            buyOrders = result.buyOrders;
        }
    );
    
    let isSwapped = true;
    while(isSwapped)
    {
        isSwapped = false;
        for (let i = 0; i < sellOrders.length - 1; i++)
        {
            if (sellOrders[i].price > sellOrders[i+1].price)
            {
                isSwapped = true;

                let tmp = sellOrders[i+1];
                sellOrders[i + 1] = sellOrders[i];
                sellOrders[i] = tmp;
            }
        }
    }

    isSwapped = true;
    while(isSwapped)
    {
        isSwapped = false;
        for (let i = 0; i < buyOrders.length - 1; i++)
        {
            if (buyOrders[i].price > buyOrders[i+1].price)
            {
                isSwapped = true;

                let tmp = buyOrders[i+1];
                buyOrders[i + 1] = buyOrders[i];
                buyOrders[i] = tmp;
            }            
        }
    }

    sellOrders.reverse();
    buyOrders.reverse();

    for(let j = 0; j < buyOrders.length-1; j++){
        if (buyOrders[j].price == buyOrders[j+1].price){
            let equalOrders = [];
            let swapped = true;
            let k = j;
            while(swapped){

                if (buyOrders[j].price == buyOrders[k].price){
                    equalOrders.push(buyOrders[k]);
                    if (k+1 == buyOrders.length){
                        swapped = false;
                    }
                    else{
                        k++;
                    }
                }
                else{
                    swapped = false;
                }
            }
            isSwapped = true;
            while(isSwapped)
            {
                isSwapped = false;
                for (let l = 0; l < equalOrders.length - 1; l++)
                {
                    if (equalOrders[l].orderPlacement > equalOrders[l+1].orderPlacement)
                    {
                        isSwapped = true;

                        let tmp = equalOrders[l+1];
                        equalOrders[l + 1] = equalOrders[l];
                        equalOrders[l] = tmp;
                    }            
                }
            }
            
            for(var l = 0; l < equalOrders.length; l++){
                buyOrders[j+l] = equalOrders[l];
            }
        }
    }

    for(let j = 0; j < sellOrders.length-1; j++){
        if (sellOrders[j].price == sellOrders[j+1].price){
            let equalOrders = [];
            let swapped = true;
            let k = j;
            while(swapped){
                if (sellOrders[j].price == sellOrders[k].price){
                    equalOrders.push(sellOrders[k]);
                    if (k+1 == sellOrders.length){
                        swapped = false;
                    }
                    else{
                        k++;
                    }
                }
                else{
                    swapped = false;
                }
            }
            isSwapped = true;
            while(isSwapped)
            {
                isSwapped = false;
                for (let l = 0; l < equalOrders.length - 1; l++)
                {
                    if (equalOrders[l].orderPlacement > equalOrders[l+1].orderPlacement)
                    {
                        isSwapped = true;

                        let tmp = equalOrders[l+1];
                        equalOrders[l + 1] = equalOrders[l];
                        equalOrders[l] = tmp;
                    }            
                }
            }
            
            for(var l = 0; l < equalOrders.length; l++){
                sellOrders[j+l] = equalOrders[l];
            }
        }
    }

    for(let k = 0; k < sellOrders.length; k++){
        for (let j = 0; j < buyOrders.length; j++){
            if (buyOrders[j].price >= sellOrders[k].price){
                if(sellOrders[k].shares !=0){
                
                    if ((buyOrders[j].shares < sellOrders[k].shares) && buyOrders[j].shares != 0){
                        const buy = await fulfillBuy(buyOrders[j], buyOrders[j].shares);
                        const sell = await fulfillSell(sellOrders[k], buyOrders[j], buyOrders[j].shares);
                        const add = await addToFulfilled(sellOrders[k], buyOrders[j], buyOrders[j].shares);
                        sellOrders[k].shares -= buyOrders[j].shares;
                        buyOrders[j].shares = 0;
                    }else if(buyOrders[j].shares > sellOrders[k].shares){
                        const buy = await fulfillBuy(buyOrders[j], sellOrders[k].shares);
                        const sell = await fulfillSell(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        const add = await addToFulfilled(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        buyOrders[j].shares -= sellOrders[k].shares;
                        sellOrders[k].shares = 0;
                    }else if(buyOrders[j].shares == sellOrders[k].shares){
                        const buy = await fulfillBuy(buyOrders[j], sellOrders[k].shares);
                        const sell = await fulfillSell(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        const add = await addToFulfilled(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        sellOrders[k].shares = 0;
                        buyOrders[j].shares = 0;
                    }
                }
            
            }
        }
    }


    async function fulfillBuy(buyOrder, shares){
        let userPortfolio = [];
        const user = await User.findById(
            buyOrder.userID,
            function(err, res){
                if(err){
                    return res.status(400).send(err);
                }
                userPortfolio = res.stockPortfolio;
            }
        );
    
        let currStocks = 0
        let hasStock = false;
        for (var stock in userPortfolio){
            if (userPortfolio[stock].stockID == req.params.stockAbbreviation){
                currStocks = userPortfolio[stock].shares;
                hasStock = true;
            }
        }

        if(hasStock){
            console.log("here.")
            User.updateMany(
                {_id: buyOrder.userID, 'stockPortfolio.stockID' : req.params.stockAbbreviation},
                {$set: {'stockPortfolio.$.shares': currStocks+shares}},
                function(err){
                    if(err){
                        return res.status(422).send(err);
                    }
                    //console.log('buyorder '+ buyOrder.userID +' fulfilled');
                }
            );
        }
        else{
            User.findByIdAndUpdate(
                buyOrder.userID,{
                $push: {stockPortfolio: {
                    stockID: req.params.stockAbbreviation,
                    shares: shares
                }}}, 
                function(err){
                    if(err){
                        return res.status(422).send(err);
                    }
                    //console.log('buyorder '+ buyOrder.userID +' fulfilled');
                }
            );
        }
    }

    async function fulfillSell(sellOrder, buyOrder, shares){
        let currentFunds = 0;
        const user = await User.findById(
            sellOrder.userID,
            function(err, res){
                if(err){
                    return res.status(400).send(err);
                }
                currentFunds = res.userFunds;
            }
        );

        User.findByIdAndUpdate(sellOrder.userID,{
            $set: {userFunds: currentFunds+(buyOrder.price*shares)}}, 
            function(err){
                if(err){
                    return res.status(422).send(err);
                }
                console.log(sellOrder.userID + ': Sell '+ shares + ' to ' + buyOrder.userID + ' for ' + buyOrder.price + '. (' + (buyOrder.price*shares) + ')');
            }
        );  
    }

    async function addToFulfilled(sellOrder, buyOrder, shares){
        completedOrders.push({
            buyerID: buyOrder.userID,
            sellerID: sellOrder.userID,
            shares: shares,
            soldFor: buyOrder.price,
            asked: sellOrder.price,
            datetime: day
        });
    }

    for(let i in sellOrders){
        if(sellOrders[i].shares != 0){
            let userPortfolio = [];
            const user = await User.findById(
                sellOrders[i].userID,
                function(err, res){
                    if(err){
                        return res.status(400).send(err);
                    }
                    userPortfolio = res.stockPortfolio;
                }
            );
        
            let currStocks = 0
            let hasStock = false;
            for (let stock in userPortfolio){
                if (userPortfolio[stock].stockID == req.params.stockAbbreviation){
                    currStocks = userPortfolio[stock].shares;
                    hasStock = true;
                }
            }
    
            if(hasStock){
                console.log("here.")
                User.updateMany(
                    {_id: sellOrders[i].userID, 'stockPortfolio.stockID' : req.params.stockAbbreviation},
                    {$set: {'stockPortfolio.$.shares': currStocks+sellOrders[i].shares}},
                    function(err){
                        if(err){
                            return res.status(422).send(err);
                        }
                    }
                );
            }
            else{
                User.findByIdAndUpdate(
                    sellOrders[i].userID,{
                    $push: {stockPortfolio: {
                        stockID: req.params.stockAbbreviation,
                        shares: sellOrders[i].shares
                    }}}, 
                    function(err){
                        if(err){
                            return res.status(422).send(err);
                        }
                    }
                );
            }

            uncompletedOrders.push({
                type: "Sell",
                userID: sellOrders[i].userID,
                shares: sellOrders[i].shares,
                price: sellOrders[i].price,
            });
        }
    }

    for(let i in buyOrders){
        if(buyOrders[i].shares != 0){
            let funds;
            const user = await User.findById(
                buyOrders[i].userID,
                async function(err,result){
                    if(err){
                        return res.status(400).send(err);
                    }
                    funds = result.userFunds;
                }
            );

            User.findByIdAndUpdate(
                buyOrders[i].userID,
                {$set:{userFunds: funds+(buyOrders[i].price*buyOrders[i].price)}},
                function(err){
                    if(err){
                        return res.status(400).send(err);
                    }
                }
            );

            uncompletedOrders.push({
                type: "Buy",
                userID: buyOrders[i].userID,
                shares: buyOrders[i].shares,
                price: buyOrders[i].price,
            });
        }
    }

    Stock.findOneAndUpdate(
        {'stockAbbreviation' : req.params.stockAbbreviation},
        {$set: {fulfilledOrders: completedOrders}},

        function(err){
            if(err){
                return res.status(400).send(err);
            }
            console.log("success");
        }
    );

    for (let i in completedOrders){
        Stock.findOneAndUpdate(
            {'stockAbbreviation' : req.params.stockAbbreviation},
            {$push: {history: completedOrders[i]}},
    
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
            }
        );

        User.findByIdAndUpdate(
            completedOrders[i].buyerID,
            {$push: {pBuyOrders: completedOrders[i]}},
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
                
            }
        );

        User.findByIdAndUpdate(
            completedOrders[i].sellerID,
            {$push: {pSellOrders: completedOrders[i]}},
            function(err){
                if(err){
                    return res.status(400).send(err);
                }
                
            }
        );
    }

    Stock.findOneAndUpdate(
        {'stockAbbreviation' : req.params.stockAbbreviation},
        {$set: {sellOrders: []}},

        function(err){
            if(err){
                return res.status(400).send(err);
            }
        }
    );

    Stock.findOneAndUpdate(
        {'stockAbbreviation' : req.params.stockAbbreviation},
        {$set: {buyOrders: []}},

        function(err){
            if(err){
                return res.status(400).send(err);
            }
        }
    );

    res.json({success: completedOrders});

});

module.exports = app;