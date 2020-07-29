//1
const express = require('express');
const router = express.Router();

//3 order CRUD

// order Create API
router.post('/', (req, res) => {
    res.json({
        message: "order Create API"
    })
})

// order Retrieve API
router.get('/', (req, res) => {
    res.json({
        message: "order Retrieve API"
    })
})

// order Update API
router.patch('/', (req, res) => {
    res.json({
        message: "order Update API"
    })
})

// order Delete API
router.delete('/', (req, res) => {
    res.json({
        message: "order Delete API"
    })
})
 
//2 
module.exports = router;

 