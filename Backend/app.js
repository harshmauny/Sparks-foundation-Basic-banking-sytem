const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(morgan('dev'));


//=====================mongoose connection==============================
mongoose.connect(
    "mongodb+srv://sparks:sparks@sparkscluster.tajjc.mongodb.net/bankData?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB working');
});


//========================routes==========================================
const transactionRouter = require('./routes/transactions');
const usersRouter = require('./routes/users');

app.use('/transactions', transactionRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log("working")
});