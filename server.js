const express = require('express');

const bodyParser = require('body-parser')
const logger = require('morgan');

const mongoose = require('mongoose');

const app = express();


const productRoute = require("./routes/product");

const orderRoute = require("./routes/order");

const userRoute = require("./routes/user");

// 데이터베이스 연결 
const dbAdress = "mongodb+srv://admin:tmdduf23@cluster0.gv7zv.mongodb.net/shoppingmall?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose
    .connect(dbAdress, options)
    .then(() => console.log("mongoDB connected ..."))
    .catch(err => console.log(err.message));

// middleware 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));

app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

const PORT = 7000;

app.listen(PORT, console.log("server started"));

