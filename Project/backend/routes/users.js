const router = require('express').Router();
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
        pSellOrders,
        unpBuyOrders,
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
        console.log("RESULT: " + result);
        res.send('Done')
    });
});

module.exports = router;