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



app.post("/register", function(req,res) {
    const newUser = new User({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,
        userFunds: 0,
        notifications: [],
        eventSubscriptions: [],
        watchlistCollection: [],
        stockPortfolio: [],
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
app.get("/:id/watchlist/", async(req,res)=>{

  /*   try{
        const user = await User.findById(req.params.id);
        res.send(user.watchlistCollection);
    }catch(e){
        return res.send("user not found");
    }
 */
    const user = await User.findById(req.params.id)
    .catch((err)=>{
        return res.send("user not found");
    })
    
    res.send(user.watchlistCollection);
    
    
});


// // get single watchlist
app.get('/:id/watchlist/:wid', async(req,res)=>{
    // console.log(req.params);
    const user = await User.findById(req.params.id)
    .catch((err)=>{
        return res.send("user not found");
    })
  

    let collection = user.watchlistCollection;

    collection.forEach(element => {
        if(element.name==req.params.wid){

            res.send(element);
        }
    
    });
    

});

// // add stock to a watchlist 
app.post("/:id/watchlist/update/add", function(req, res){
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
app.delete("/:id/watchlist/update/remove", function(req,res){
    // console.log(req.params);
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