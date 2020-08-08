// 1
const express = require('express');
// 2
const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken'); 

// 4
const userModel = require("../models/user");


// 회원가입
router.post("/signup", (req, res) => {
    // "../models/user"에 있는 스키마를 가져온다.
    userModel
        // 사용자가 입력한 email을 찾을 것이다.
        .findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(409).json({
                    message: "Mail already exists"
                });
            } else {
                //bcrypt안에 hash함수 사용
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
                                    error: err.message
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err.message
            })
        })
});

// 로그인
router.post("/login", (req, res) => {
    // email 유무체크 email이 있어야한다. 있어야 로그인이 가능하기 때문에.
    // email이 없다면 등록된 email이 없다라는 메세지를 띄워주고, email이 있다면 패스워드 매칭 (암호화된 패스워드 풀어줘야한다.)
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(409).json({
                    message: "No email"
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                    if(err || isMatch === false) {
                        return res.status(401).json({
                            message: "password Incorrect"
                        })
                    } else {
                        // 로그인을 하면 토큰이 발행한다.
                        // 사용자 정보를 담은 token이라는 곳에 담아서 던져줄 것이다
                        // 자동 로그인 브라우저나 핸드폰에 토큰이 저장되어있는 것 토큰은 시간제한이 있다.
                        const token = jwt.sign(

                            {email: user.email, userId: user._id},
                            // 암호화된 key, 키가 제대로 만들어졌는지 안만들어졌는지 구분,검증을 해주는 key
                            "secret", 
                            // 만료 시간 설정
                            {expiresIn: "1d"}
                        )
                        res.status(200).json({
                            message: "login success",
                            token: token
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: error.message
            })
        })
});












// 3 
module.exports = router;