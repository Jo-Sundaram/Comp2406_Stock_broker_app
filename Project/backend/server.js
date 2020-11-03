const express = require('express');
const http = require("http");
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); // helps connect to mongodb database

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

let interval;

let users = []

io.on("connection", (client) => {
    console.log("New client connected");
    console.log('Client ID:' + client.id);

    client.on("connected", function(user){
        console.log('UserID:' + user);
        users.push({userID: user, clientInfo: client})
        //console.log(users);

        //checkOutProcessedOrders(client);
    });

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => checkOutProcessedOrders(client), 50000);

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
                }
                if(stocks[i].fulfilledOrders[j].buyerID == users[k].userID){
                    console.log("pop!");
                    client = users[k].clientInfo;
                    client.emit("processedBuyOrder", stocks[i].fulfilledOrders[j], stocks[i].stockAbbreviation);
                }
            }
        }
    }
}

app.io = io;


server.listen(port, () => {
    console.log('Server is running on port 5000');
});