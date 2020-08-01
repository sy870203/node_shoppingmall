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

    productModel
        .find()
        .then(docs => {
            res.json({
                count: docs.length,
                products: docs
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        });

    // res.json({
    //     message: "product Retrieve API"
    // })
})

// product detail retrieve API
router.get('/:productID', (req, res) => {
    
    productModel
        .findById(req.params.productID)
        .then(doc => {
            res.json({
                message: "successful product data" + req.params.productID,
                productInfo: doc
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
})



// product update API
router.patch("/", (req, res) => {
    res.json({
        message: "product Update API"
    })
})

// product delete API
router.delete("/:productID", (req, res) => {

    productModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: "deleted at " + req.params.productID
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        });


    // res.json({
    //     message: "product Delete API"
    // })
})


module.exports = router;