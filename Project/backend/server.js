const express = require('express');
const http = require("http");
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); // helps connect to mongodb database
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const socketIo = require("socket.io")

const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");

JWTStrategy = passportJWT.Strategy;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
console.log(uri);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection with MongoDb successfully established');
})

let User = require('./models/user.model');

app.use(passport.initialize())
  
passport.use(new LocalStrategy({
    usernameField: "email"
}, 
    async (email, password, cb) => {
        try {
            const user = await User.findOne({
                $or: [{ email }],
            });

        
            if (!user || !user.password) {
                console.log("incorrect password");
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
        
            if (password != user.password) {
                console.log("incorRRrect password");
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            console.log("logged in password");
            return cb(null, user, { message: 'Logged In Successfully' });
        } catch (err) {
            return cb(null, false, {statusCode: 400, message: err.message});
        }
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwt_secret"
    }, 
    async (jwt_payload, done) => {

        const user = await User.findById(jwt_payload.user._id);

        if (!user || !user.password) {
            return done(null, false, {
                message: "Token not matched"
            })
        }

        if(user.id === jwt_payload.user._id){
            return done(null, user)
        } else {
            return done(null, false, {
                message: "Token not matched"
            })
        }
    }
))


const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const stocksRouter = require('./routes/stocks');
const updateRouter = require('./routes/update');

// app.use(express.static(path.join(__dirname, "client/build")))

app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);
app.use('/update', updateRouter);
app.use('/api', apiRouter);

const server = http.createServer(app)

const io = socketIo(server);

app.use(express.static(__dirname + '/superuser')); 
//redirect / to our index.html file

app.get('/superuser', function(req, res,next) {  
  res.sendFile(__dirname + '/superuser/superuser.html');
});

let interval;

let users = []
let serverKey = "jomama";

io.on("connection", (client) => {
    console.log("New client connected");
    console.log('Client ID:' + client.id);

    client.on("connected", function(user){
        console.log('UserID:' + user);
        users.push({userID: user, clientInfo: client})
        //console.log(users);

        //checkOutProcessedOrders(client);
    });

    client.on("simday", function(user){
        console.log(user);
        if(user.key == serverKey){
            processStocks();
        }
    })

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => checkMetES(client), 150000);
    interval = setInterval(() => checkOutProcessedOrders(client), 150000);
    interval = setInterval(() => updateStockValue(), 150000);

    client.on("disconnect", () => {
        console.log("Client disconnected");

        for(var i in users){
            if (users[i].clientInfo == client){
                users.splice(i,1);
            }
        }
        console.log(users);
        clearInterval(interval);
    });
});

const getApiAndEmit = client => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  
  client.emit("FromAPI", response);
};

let Stock = require('./models/stock.model');
const checkOutProcessedOrders = async client => {
    const stocks = await Stock.find();
    
    for(var i in stocks){
        for (var j in stocks[i].fulfilledOrders){
            for(var k in users){
                if(stocks[i].fulfilledOrders[j].sellerID == users[k].userID){
                    console.log("pop!");
                    client = users[k].clientInfo;
                    client.emit("processedSellOrder", stocks[i].fulfilledOrders[j], stocks[i].stockAbbreviation);
                    pushNotification(stocks[i].fulfilledOrders[j].sellerID, ("You sold " + stocks[i].fulfilledOrders[j].shares + ' shares of ' + stocks[i].stockAbbreviation + " for $" + stocks[i].fulfilledOrders[j].soldFor + " to " + stocks[i].fulfilledOrders[j].buyerID));
                }
                if(stocks[i].fulfilledOrders[j].buyerID == users[k].userID){
                    console.log("pop!");
                    client = users[k].clientInfo;
                    client.emit("processedBuyOrder", stocks[i].fulfilledOrders[j], stocks[i].stockAbbreviation);
                    pushNotification(stocks[i].fulfilledOrders[j].buyerID, ("You bought " + stocks[i].fulfilledOrders[j].shares + ' shares of ' + stocks[i].stockAbbreviation + " for $" + stocks[i].fulfilledOrders[j].soldFor + " to " + stocks[i].fulfilledOrders[j].buyerID));
                }
            }
        }

        for(var k in stocks[i].unfulfilledOrders){
            for(var k in users){
                if(stocks[i].unfulfilledOrders[j].userID == users[k].userID){
                    console.log("pop!");
                    client = users[k].clientInfo;
                    client.emit("unprocessedOrder", stocks[i].unfulfilledOrders[j], stocks[i].stockAbbreviation);
                    pushNotification(stocks[i].unfulfilledOrders[j].userID, ("Could not fulfill " + stocks[i].unfulfilledOrders[j].type + " order" + " for " + stocks[i].stockAbbreviation + " (" + stocks[i].unfulfilledOrders[j].price +"/share, " + stocks[i].unfulfilledOrders[j].shares + "shares)"));
                }
            }
        }

    }
}

const checkMetES = async client => {
    const stocks = await Stock.find();

    for(var i in stocks){
        let openingAsk = stocks[i].openingAsk;
        let openingBid = stocks[i].openingBid;

        let currentAsk = 0;
        let currentBid = 0;

        if(stocks[i].sellOrders.length >= 1){
            currentAsk = stocks[i].sellOrders[0].price;
        }

        for(var j in stocks[i].buyOrders){
            if (stocks[i].buyOrders[j].price > currentBid){
                currentBid = stocks[i].buyOrders[j].price;
            }
        }

        for(var j in stocks[i].sellOrders){
            if (stocks[i].sellOrders[j].price < currentAsk){
                currentAsk = stocks[i].sellOrders[j].price;
            }
        }

        let dollarAskChange = Math.abs(currentAsk - openingAsk);
        let perAskChange = Math.abs(dollarAskChange/openingAsk)*100;

        let dollarBidChange = Math.abs(currentBid - openingBid);
        let perBidChange = Math.abs(dollarBidChange/openingBid)*100;

        for (var k in stocks[i].eventSubscriptions){
            let notifSent = 0;
            let notification = {};

            if(stocks[i].eventSubscriptions[k].notifSent == 0){
                
                if(stocks[i].eventSubscriptions[k].type == "Ask"){
                    if( stocks[i].eventSubscriptions[k].parameter == "incPrcnt"){
                        if (perAskChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "ask",
                                stock: stocks[i].stockAbbreviation,
                                change: "increased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "%"
                            }
                            notifSent = 1;
                        }
                    }
                    if(stocks[i].eventSubscriptions[k].parameter == "incDollar"){
                        if (dollarAskChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "ask",
                                stock: stocks[i].stockAbbreviation,
                                change: "increased",
                                stocks: stocks[i].eventSubscriptions[k].value,
                                param: "$"
                            }
                            notifSent = 1;
                        }
                    }
                    if(stocks[i].eventSubscriptions[k].parameter == "decPrcnt"){
                        if (perAskChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "ask",
                                stock: stocks[i].stockAbbreviation,
                                change: "decreased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "%"
                            }
                            notifSent = 1;
                        }
                    }
                    if(stocks[i].eventSubscriptions[k].parameter == "decDollar"){
                        if (dollarAskChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "ask",
                                stock: stocks[i].stockAbbreviation,
                                change: "decreased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "$"
                            }
                            notifSent = 1;
                        }
                    }
                }

                if(stocks[i].eventSubscriptions[k].type == "Bid"){
                    if( stocks[i].eventSubscriptions[k].parameter == "incPrcnt"){
                        if (perBidChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "bid",
                                stock: stocks[i].stockAbbreviation,
                                change: "increased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "%"
                            }
                            notifSent = 1;
                        }
                    }
                    if(stocks[i].eventSubscriptions[k].parameter == "incDollar"){
                        if (dollarBidChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "bid",
                                stock: stocks[i].stockAbbreviation,
                                change: "increased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "$"
                            }
                            notifSent = 1;
                        }
                    }
                    if(stocks[i].eventSubscriptions[k].parameter == "decPrcnt"){
                        if (perBidChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "bid",
                                stock: stocks[i].stockAbbreviation,
                                change: "decreased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "%"
                            }
                            notifSent = 1;
                        }
                    }
                    if(stocks[i].eventSubscriptions[k].parameter == "decDollar"){
                        if (dollarBidChange >=  stocks[i].eventSubscriptions[k].value){
                            notification = {
                                type: "bid",
                                stock: stocks[i].stockAbbreviation,
                                change: "decreased",
                                value: stocks[i].eventSubscriptions[k].value,
                                param: "$"
                            }
                            notifSent = 1;
                        }
                    }
                }
                
            }

            if(notifSent == 1){      
                for(var f in users){
                    if(stocks[i].eventSubscriptions[k].userID == users[f].userID){
                        console.log("prrrrrrrrrrrrraaaaaaappaapap");
                        client = users[f].clientInfo;
                        
                        client.emit("eventNotif", notification);

                        Stock.updateMany(
                            {"stockAbbreviation": stocks[i].stockAbbreviation, 'eventSubscriptions.subscriptionID' : stocks[i].eventSubscriptions[k].subscriptionID},
                            {$set: {'eventSubscriptions.$.notifSent': 1}},
                            function(err){
                                if(err){
                                    console.log(err);
                                }
                            }
                        );
                    }
                }

                User.findByIdAndUpdate(
                    stocks[i].eventSubscriptions[k].userID,
                    {$push: {notifications: {
                        notification: ("EVENT SUBSCRIPTION: " + notification.stock + " " + notification.type + " " + notification.change + " by " + notification.value + notification.param + ".")
                    }}},
                    function(err){
                        if(err){
                            console.log(err);
                        }
                    }
                );

            }
        }
    }
}

function pushNotification(userID, notification){
    User.findByIdAndUpdate(
        userID,
        {$push: {notifications: {
            notification: notification
        }}},
        function(err){
            if(err){
                console.log(err);
            }
        }
    );
}

const processStocks = async () => {
    const stocks = await Stock.find();

    for(let i in stocks){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "http://localhost:5000/update/" + stocks[i].stockAbbreviation, true ); // false for synchronous request
        xmlHttp.send( null );
    }

    const users = await User.find();

    for(let j in users){
        User.findByIdAndUpdate(
            users[j]._id,
            {$set: {unpBuyOrders: []}},
            function(err){
                if(err){
                    console.log(err);
                }
                
            }
        );

        User.findByIdAndUpdate(
            users[j]._id,
            {$set: {unpSellOrders: []}},
            function(err){
                if(err){
                    console.log(err);
                }
                
            }
        );
    }
}

const updateStockValue = async () => {

    const stocks = await Stock.find();

    for(var i in stocks){
        let currentAsk = 0;
        let currentBid = 0;

        if(stocks[i].sellOrders.length >= 1){
            currentAsk = stocks[i].sellOrders[0].price;
        }

        for(var j in stocks[i].buyOrders){
            if (stocks[i].buyOrders[j].price > currentBid){
                currentBid = stocks[i].buyOrders[j].price;
            }
        }

        for(var j in stocks[i].sellOrders){
            if (stocks[i].sellOrders[j].price < currentAsk){
                currentAsk = stocks[i].sellOrders[j].price;
            }
        }
        Stock.findOneAndUpdate(stocks[i].stockAbbreviation, {$set:{currentAsk: currentAsk}},{new:true}, function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        });

        Stock.findOneAndUpdate(stocks[i].stockAbbreviation, {$set:{currentBid: currentBid}},{new:true}, function(err){
            if(err){
                return res.status(400).send(err);
            }
            res.json({success: true});
        });

    }
}

app.io = io;


server.listen(port, () => {
    console.log('Server is running on port 5000');
});