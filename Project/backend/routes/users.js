const router = require('express').Router();
const { watch } = require('../models/user.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const userFunds = Number(req.body.userFunds);
    const watchlist = req.body.watchlist; 
    const notifications = req.body.notifications;
    const eventSubscriptions = req.body.eventSubscriptions;
    const unpBuyOrders = req.body.unpBuyOrders;
    const unpSellOrders = req.body.unpSellOrders;
    const pBuyOrders = req.body.unpBuyOrders;
    const pSellOrders = req.body.pSellOrders;

    const newUser = new User({
        username,
        email,
        password,
        userFunds,
        watchlist,
        notifications,
        eventSubscriptions,
        stockPortfolio,
        unpBuyOrders,
        pBuyOrders,
        unpSellOrders,
        pSellOrders
    });

    newUser.save()
        .then(() => res.json('User added to the database'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true},  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});



//get all subscriptions.
router.route('/:id/ES').get((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id)
    .then(user=>{
            let eventsubs = user.eventSubscriptions;
            res.json(eventsubs);
    }).catch(err => res.status(400).json('Error: ' + err))
});


//add event subscription to stock.
router.route('/:id/update/ES/add/').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
        $push: {eventSubscriptions: {
            subscriptionID: req.body.subscriptionID,
            stockID: req.body.stockID,
            parameter: req.body.parameter,
            value: req.body.value,
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



//edit event subscription to stock.
router.route('/:id/update/ES/update/:eid').post((req, res) => {
    //console.log('here');
    User.updateMany({_id: req.params.id, 'eventSubscriptions.subscriptionID' : req.params.eid},{
        $set: {'eventSubscriptions.$.value': req.body.value}   
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});

//place buyorder
router.route('/update/buyorder/:id').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
        $push: {unpBuyOrders: {
            orderID: req.body.orderID,
            stockID: req.body.stockID,
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
router.route('/update/sellorder/:id').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
        $push: {unpSellOrders: {
            orderID: req.body.orderID,
            stockID: req.body.stockID,
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
router.route('/delete/sellorder/:id').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
        $pull: {unpSellOrders: {
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

router.route('/delete/buyorder/:id').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
        $pull: {unpBuyOrders: {
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


router.route('/delete/buyorder/:id').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
        $pull: {unpBuyOrders: {
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


// add an empty watchlist to collection
router.route('/:id/watchlist/add').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
            $push: {watchlistCollection: {
                name: req.body.name,
                watchlist:[],
            }
        }
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Done')
    });
});


// get entire watchlist collection
router.route('/:id/watchlist/').get((req, res) => {
    User.findById(req.params.id)
        .then(users =>{
            let list = users.watchlistCollection;

            res.json(list);

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// get single watchlist
router.route('/:id/watchlist/:wid').get((req, res) => {
    User.findById(req.params.id)
        .then(users =>{
            let list = users.watchlistCollection;
            list.forEach(element => {
                if(element.name==req.params.wid){
                    res.json(element.watchlist)
                }
            });
            res.json(list);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// add stock to a watchlist 
router.route('/:id/watchlist/:wid/add').post((req, res) => {
    // console.log('here');

    User.findByIdAndUpdate(req.params.id,{
         $push: {"watchlistCollection.0.watchlist": {stockID:req.body.stockID}}

    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Stock added')
    });
 
});


// remove stock from a watchlist 
router.route('/:id/watchlist/:wid/remove').post((req, res) => {
    // console.log('here');

    User.findByIdAndUpdate(req.params.id,{
         $pull: {"watchlistCollection.2.watchlist": {stockID: req.body.stockID}}

    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Stock removed')
    });
 
});


// remove a watchlist from the collection
router.route('/:id/watchlist/remove').post((req, res) => {
    //console.log('here');
    User.findByIdAndUpdate(req.params.id,{
            $pull: {watchlistCollection:
                {
                    _id: req.body.id
                }
        }
    },  function(err, result){
        if(err || result == null){
            console.log("there is an error");
            console.log(err);
        }
        //console.log("RESULT: " + result);
        res.send('Watchlist Removed')
    });
});
       

module.exports = router;