const express = require('express');
const { kakaoLogin, kakaoAuth, naverAuth, naverLogin} = require('../controllers/authController');

const router = express.Router();

router.get('/kakao', kakaoAuth);
router.post('/login/kakao', kakaoLogin);

router.get('/naver', naverAuth);
router.post('/login/naver', naverLogin)

module.exports = router;
