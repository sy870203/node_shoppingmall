//1
const express = require('express');
const router = express.Router();

const productModel = require('../models/product');

// product C.R.U.D

// product Create API
router.post('/', (req, res) => {

    const newUser = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newUser
        .save()
        .then(user => {
            res.json({
                message: "successful register user",
                userInfo: user
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        });


    
    // const newProduct = {
    //     name: req.body.productname,
    //     price: req.body.productprice
    // }

    // res.json({
    //     message: "product Create API",
    //     productInfo: newProduct
    // })
})

// product Retrieve API
router.get("/", (req, res) => {
    res.json({
        message: "product Retrieve API"
    })
})

// product update API
router.patch("/", (req, res) => {
    res.json({
        message: "product Update API"
    })
})

// product delete API
router.delete("/", (req, res) => {
    res.json({
        message: "product Delete API"
    })
})


module.exports = router;