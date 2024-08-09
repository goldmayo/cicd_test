const axios = require('axios');
const { findOrCreateUser } = require('../config/passport');
const jwt = require('jsonwebtoken');

exports.kakaoAuth = (req, res) => {
    const REST_API_KEY = process.env.KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    res.redirect(kakaoAuthUrl);
};

exports.kakaoLogin = async (req, res) => {
    const { code } = req.query;

    try {
        // Auth code를 사용해 access token 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENT_ID,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code: code,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = tokenResponse.data;

        // Access token을 사용해 사용자 정보 요청
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const user = await findOrCreateUser(userInfoResponse.data);

        // JWT 토큰 생성
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({
            message: '로그인 성공',
            token,
        });
    } catch (error) {
        console.error('카카오 로그인 오류:', error);
        res.status(500).json({ message: '카카오 로그인 실패', error: error.message });
    }
};
