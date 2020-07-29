const express = require('express');

const bodyParser = require('body-parser')
const logger = require('morgan');

const app = express();


const productRoute = require("./routes/product");

const orderRoute = require("./routes/order");

// middleware 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));

app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = 7000;

app.listen(PORT, console.log("server started"));

