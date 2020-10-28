//const router = require('express').Router();
//const { watch } = require('../models/user.model');
const express = require("express");
let User = require('../models/user.model');
const app = express.Router();

app.get("/", async(req,res) => {
    const stocks = await User.find();
    res.send(stocks);
});

app.get("/:id", async(req,res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});


// router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const userFunds = Number(req.body.userFunds);
//     const watchlist = req.body.watchlist; 
//     const notifications = req.body.notifications;
//     const eventSubscriptions = req.body.eventSubscriptions;
//     const unpBuyOrders = req.body.unpBuyOrders;
//     const unpSellOrders = req.body.unpSellOrders;
//     const pBuyOrders = req.body.unpBuyOrders;
//     const pSellOrders = req.body.pSellOrders;

//     const newUser = new User({
//         username,
//         email,
//         password,
//         userFunds,
//         watchlist,
//         notifications,
//         eventSubscriptions,
//         stockPortfolio,
//         unpBuyOrders,
//         pBuyOrders,
//         unpSellOrders,
//         pSellOrders
//     });

//     newUser.save()
//         .then(() => res.json('User added to the database'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

app.post("/register", function(req,res) {
    const newUser = new User({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,
        userFunds: 2000,
        notifications: [],
        eventSubscriptions: [],
        watchlistCollection: [],
        stockPortfolio: req.body.stockPortfolio,
        unpBuyOrders: [],
        pBuyOrders: [],
        unpSellOrders: [],
        pSellOrders: []
    });

    newUser.save(function(err){
        if(err){
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username/email
                return res.status(400).send({ success: false, message: 'User/Email already exist!' });
              }
        
              // Some other error
              return res.status(400).send(err);
            }
        res.send(newUser);
    });
});

app.post("/update/:id", function(req,res){
    User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}, function(err){
        if(err){
            return res.status(400).send(err);
        }
        res.json({success: true});
    });
});

app.get("/:id/ES", function(req,res){
    User.findById(req.params.id, function(err, result){
        if(err){
            return res.status(400).send(err);
        }
        res.json(result.eventSubscriptions);
    });
});

//note: withdraw too much
app.post("/:id/updateFunds", function(req,res){
    User.findByIdAndUpdate(
        req.params.id,
        {$set: {userFunds: req.body.userFunds}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        }
    );
});

//add an empty watchlist to collection
app.post("/:id/watchlist/add", function(req,res){
    User.findByIdAndUpdate(
        req.params.id,{
        $push: {watchlistCollection: {
            name: req.body.name,
            watchlist:[],
        }}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        }
    );
});


//get entire watchlist collection
app.get("/:id/watchlist/", function(req,res){
    User.findById(req.params.id,
        function(err){
            if(err){
                return res.status(400).send(err);
            }
            let list = users.watchlistCollection;
            res.json(list);
        }
    );
});


// // get single watchlist
app.get('/:id/watchlist/:wid', function(req,res){
    User.findById(
        req.params.id,
        function(err){
            if (err){
                return res.status(400).send(err);
            }
            let list = res.watchlistCollection;
            list.forEach(element => {
              
                if(element.name==req.params.wid){
                    res.json(element.watchlist)
                }
                
            });

            res.json(list);
        }
    )
});

// // add stock to a watchlist 
app.post("/:id/watchlist/update/add", function(res, req){
    User.updateMany(
        {_id: req.params.id, 'watchlistCollection.name': req.body.name},
        {$push:{'watchlistCollection.$.watchlist':
            {stockID: req.body.stockID
        }}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        }
    );
});

// remove stock from a watchlist 
app.delete("/:id/watchlist/update/remove", function(res,req){
    User.updateMany(
        {_id: req.params.id, 'watchlistCollection.name': req.body.name},
        {$pull : {'watchlistCollection.$.watchlist' : 
            {stockID: req.body.stockID
        }}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        }
    );
});


// // remove a watchlist from the collection
app.delete('/:id/watchlist/remove', function(req, res){
    User.findByIdAndUpdate(
        req.params.id,
        {$pull: {watchlistCollection: {
            name: req.body.name
        }}},
        function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        }
    );
});
       
// module.exports = router;
module.exports = app;