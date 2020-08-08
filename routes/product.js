//1
const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const {
    products_get_all,
    products_create_product,
    products_get_product,
    products_update_product,
    products_delete_product
} = require('../controllers/product');

// product C.R.U.D

// product Create API
router.post('/', checkAuth, products_create_product);

// product Retrieve API
router.get('/', products_get_all);

// product detail retrieve API
router.get('/:productID', checkAuth, products_get_product);

// product Update API
router.patch('/:productID', checkAuth, products_update_product);

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
router.delete("/:productID", checkAuth, products_delete_product);


module.exports = router;