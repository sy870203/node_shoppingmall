//1
const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const {
    orders_get_all,
    orders_create_order,
    orders_get_order,
    orders_update_order,
    orders_delete_order
} = require("../controllers/order");
//3 order CRUD

// order Create API
router.post('/', checkAuth, orders_create_order);

// order Retrieve API
router.get('/', checkAuth, orders_get_all);

// order detail retrieve API
router.get('/:orderID', checkAuth, orders_get_order);

// order Update API
router.patch('/:orderID', checkAuth, orders_update_order);

// order Delete API
router.delete('/:orderID', checkAuth, orders_delete_order);
 
//2 
module.exports = router;

 