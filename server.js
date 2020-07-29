const express = require('express');

const bodyParser = require('body-parser')

const app = express();


const productRoute = require("./routes/product");

const orderRoute = require("./routes/order");
const { get } = require('./routes/product');

// app.use((req, res) => {
//     res.json({
//         message: "ok"
//     })
// })

// middleware 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/product", productRoute);
app.use("/order", orderRoute);

const PORT = 7000;

app.listen(PORT, console.log("server started"));

