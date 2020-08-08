const express = require('express');

const bodyParser = require('body-parser')
const logger = require('morgan');

const app = express();


const productRoute = require("./routes/product");

const orderRoute = require("./routes/order");

const userRoute = require("./routes/user");

// connect DataBase
require('./config/database');

// middleware 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));

app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

const PORT = 7000;

app.listen(PORT, console.log("server started"));

