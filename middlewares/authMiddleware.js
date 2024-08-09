const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // 토큰에 저장된 사용자 ID를 요청 객체에 저장
        next(); // 다음 미들웨어로 넘어감
    } catch (error) {
        res.status(401).json({ message: 'Failed to authenticate token' });
    }
};

module.exports = authMiddleware;
