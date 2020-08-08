//1
const express = require('express');
const router = express.Router();

const productModel = require('../models/product');
const checkAuth = require("../middleware/check-auth");

// product C.R.U.D

// product Create API
router.post('/', checkAuth, (req, res) => {

    const newProduct = new productModel({
        name: req.body.productname,
        price: req.body.productprice
    })

    newProduct
        .save()
        .then(product => {
            res.json({
                message: "successful register user",
                userInfo: {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:7000/product/" + product._id
                    }
                }
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
router.get('/', (req, res) => {

    productModel
        .find()
        .then(docs => {
            // res.json({
            //     count: docs.length,
            //     products: docs
            // });

            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        // 자동화
                        request: {
                            type: "GET",
                            url: "http://localhost:7000/product/" + doc._id
                        }
                    }
                })
            }

            res.json(response);
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
router.get('/:productID', checkAuth, (req, res) => {
    
    productModel
        .findById(req.params.productID)
        .then(doc => {
            res.json({
                message: "successful product data" + req.params.productID,
                productInfo: {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:7000/product"
                    }
                }
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
})

// product Update API
router.patch('/:productID', checkAuth, (req, res) => {

    const updateOps = {};

    for (const ops of req.body) {
          updateOps[ops.propName] = ops.value
    };


    productModel
        .findByIdAndUpdate(req.params.productID, {$set: updateOps})
        .then(result => {
            res.json({
                message: "updated product",
                request: {
                    type: "GET",
                    url: "http://localhost:7000/product/" + req.params.productID
                }
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
})

// product update API
// router.patch("/:productID'", (req, res) => {

//     //수정할 내용 정의
//     const updateOps = {};

//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value
//     };
    
//     productModel
//         .findByIdAndUpdate(req.params.productID, {$set: updateOps})
//         .then(result => {
//             res.json({
//                 message: "updated product",
//                 result: result
//             });
//         })
//         .catch(err => {
//             res.json({
//                 message: err.message
//             });
//         });
// })

// product delete API
router.delete("/:productID", checkAuth, (req, res) => {

    productModel
        .findByIdAndDelete(req.params.productID)
        .then(() => {
            res.json({
                message: "deleted at " + req.params.productID,
                request: {
                    type: "GET",
                    url: "http://localhost:7000/product"
                }
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