//1
const express = require('express');
const router = express.Router();

const orderModel = require("../models/order");

//3 order CRUD

// order Create API
router.post('/', (req, res) => {

    const newOrder = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    });

    newOrder
        .save()
        .then(order => {
            res.json({
                message: "Order saved",
                orderInfo: {
                    id: order._id,
                    product: order.product,
                    quantity: order.quantity
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

// order Retrieve API
router.get('/', (req, res) => {
    orderModel
        .find()
        .populate('product', ['name', 'price'])
        .then(docs => {
            res.json(docs)
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
})

// 상세 오더 불러오기

router.get('/:orderID', (req, res) => {

    orderModel
        .findById(req.params.orderID)
        .then(doc => {
            res.json({
                message: "successful order data" + req.params.orderID,
                orderInfo: {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:7000/order"
                    }
                }
            });
        })
        .catch(err => {
            message: err.message
        })

})







// order Update API
router.patch('/', (req, res) => {
    res.json({
        message: "order Update API"
    })
})

// order Delete API
router.delete('/:orderID', (req, res) => {

    orderModel
        .findByIdAndDelete(req.params.orderID)
        .then(() => {
            res.json({
                message: "deleted at " + req.params.orderID,
                request: {
                    type: "GET",
                    url: "http://localhost:7000/order"
                }
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })

})
 
//2 
module.exports = router;

 