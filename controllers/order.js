const orderModel = require("../models/order");

exports.orders_get_all = (req, res) => {
    
    orderModel
        .find()
        .populate('product', ['name', 'price'])
        .then(docs => {

            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        // 자동화
                        request: {
                            type: "GET",
                            url: "http://localhost:7000/order/" + doc._id
                        }
                    }
                })
            }
            res.json(response)
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        });
};

exports.orders_create_order = (req, res) => {

    const newOrder = new orderModel({
        product: req.body.productId,
        quantity: req.body.qty
    });

    newOrder
        .save()
        .then(order => {
            res.json({
                message: "Order register order",
                orderInfo: {
                    id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:7000/order/" + order._id
                    }
                }
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
};

exports.orders_get_order = (req, res) => {

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
            res.json({
                message: err.message
            });
        });

};
exports.orders_update_order = (req, res) => {
    
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    };

    orderModel
        .findByIdAndUpdate(req.params.orderID, {$set: updateOps})
        .then(result => {
            res.json({
                message: "updated order",
                request: {
                    type: "GET",
                    url: "http://localhost:7000/order/" + req.params.orderID
                }
            });
        })
        .catch(err => {
            res.json({
                message: err.message
            });
        });
};

exports.orders_delete_order = (req, res) => {

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
        
};
