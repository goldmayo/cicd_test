const express = require('express');
const { kakaoLogin, kakaoAuth} = require('../controllers/authController');

const router = express.Router();

router.get('/kakao', kakaoAuth);
router.post('/login/kakao', kakaoLogin);

module.exports = router;
