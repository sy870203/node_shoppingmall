// 1
const express = require('express');
// 2
const router = express.Router();

const {
    register_user,
    login_user
} = require("../controllers/user");


// 회원가입
router.post("/signup", register_user);

// 로그인
router.post("/login", login_user);












// 3 
module.exports = router;