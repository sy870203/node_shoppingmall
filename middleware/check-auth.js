const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 토큰을 검증하는 처리
        // 토큰을 헤더에 담아서 전달된다.
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}