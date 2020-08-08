const productModel = require("../models/product");

exports.products_get_all = (req, res) => {

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
};

exports.products_create_product = (req, res) => {

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
};

exports.products_get_product = (req, res) => {
    
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
};

exports.products_update_product = (req, res) => {

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
};

exports.products_delete_product = (req, res) => {

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
};