// 1
const express = require('express');
// 2
const router = express.Router();

const bcrypt = require('bcryptjs');
// 4
const userModel = require("../models/user");


// 회원가입
router.post("/signup", (req, res) => {
    // bcrypt안에 hash함수 사용
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            return res.status(400).json({
                error: err.message
            });
        } else {
            const newUser = new userModel({
                name: req.body.userName,
                email: req.body.email,
                password: hash
            })
        
            newUser
                .save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'User Created',
                        userInfo: result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })








    






});

// 로그인
router.post("/login", (req, res) => {

});












// 3 
module.exports = router;