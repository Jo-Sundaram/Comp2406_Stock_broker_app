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

router.route('/:id').post((req, res) => {
    Stock.findById(req.params.id)
        .then(stock => res.json(stock))
        .catch(err => res.status(400).json('Error:  ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            username = req.body.username;
            email = req.body.email;
            password = req.body.password;
            userFunds = Number(req.body.userfunds);
            watchlist = req.body.watchlist; //im not sure this is how im supposed to delcare an array constant ngl
            notifications = req.body.notifications;
            eventSubscriptions = req.body.eventSubscriptions;
            buyOrders = req.body.buyOrders;
            sellOrders = req.body.sellOrders;

            stock.save()
                .then(() => res.json('Stock updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error:  ' + err));
});

module.exports = router;