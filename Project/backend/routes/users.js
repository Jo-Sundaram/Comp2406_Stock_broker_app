const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
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
    const buyOrders = req.body.buyOrders;
    const sellOrders = req.body.sellOrders;

    const newUser = new User({
        username,
        email,
        password,
        userFunds,
        watchlist,
        notifications,
        eventSubscriptions,
        buyOrders,
        sellOrders
    });

    newUser.save()
        .then(() => res.json('User added to the database'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error:  ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            username = req.body.username;
            email = req.body.email;
            password = req.body.password;
            userFunds = Number(req.body.userFunds);
            watchlist = req.body.watchlist; //im not sure this is how im supposed to delcare an array constant ngl
            notifications = req.body.notifications;
            eventSubscriptions = req.body.eventSubscriptions;
            buyOrders = req.body.buyOrders;
            sellOrders = req.body.sellOrders;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error:  ' + err));
});

module.exports = router;