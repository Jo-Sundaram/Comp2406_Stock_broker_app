const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // helps connect to mongodb database


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
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection with MongoDb successfully established');
})

const usersRouter = require('./routes/users');
const stocksRouter = require('./routes/stocks');


app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);

app.listen(port, () => {
    console.log('Server is running on port 5000');
});