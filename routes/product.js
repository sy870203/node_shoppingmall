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

// product Update API
router.patch('/:productID', (req, res) => {

    const updateOps = {};

    for (const ops of req.body) {
          updateOps[ops.propName] = ops.value
    };


    productModel
        .findByIdAndUpdate(req.params.productID, {$set: updateOps})
        .then(result => {
            res.json({
                message: "updated product",
                result: result
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
})

// // product update API
// router.patch("/:productID'", (req, res) => {
    
//     console.log(req.body);

//     //수정할 내용 정의
//     const updateOps = {};

//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value
//     } 
//     console.log(updateOps);
    
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
//             })
//         });
    
//     // res.json({
//     //     message: "product Update API"
//     // })
// })

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