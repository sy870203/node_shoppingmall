
const express = require('express');
const router = express.Router();

// product C.R.U.D

// product Create API
router.post('/', (req, res) => {
    res.json({
        message: "product Create API"
    })
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