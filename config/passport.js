const axios = require('axios');
const User = require('../models/user'); // User 모델

// 사용자 정보를 찾거나 생성하는 함수
const findOrCreateUserKakao = async (kakaoProfile) => {
    const { id, kakao_account: { email, profile } } = kakaoProfile;

    let user = await User.findOne({ where: { kakaoId: id } });

    if (!user) {
        user = await User.create({
            kakaoId: id,
            email: email,
            representativeName: profile.nickname,
            centerName: "test",
            address1: "test",
            address2: "test",
            centerType: "퍼블릭",
            representativeContact: "123-456-7890",
            businessLicense: "12414",
            centerContact: "123-456-789",
            businessRegistrationDate: "2024-08-09",
            trainerCount: 1,
            monthlyMembers: 100,
            attendanceSystemId: "abbc",
            password: "111",
            recommendedCenter: "center A"

        });
    }

    return user;
};

const findOrCreateUserNaver = async (naverProfile) => {
    const { id, email, nickname } = naverProfile.response;

    let user = await User.findOne({ where: { naverId: id } });

    if (!user) {
        user = await User.create({
            naverId: id,
            email: email,
            representativeName: nickname,
            centerName: "test",
            address1: "test",
            address2: "test",
            centerType: "퍼블릭",
            representativeContact: "123-456-7890",
            businessLicense: "12414",
            centerContact: "123-456-789",
            businessRegistrationDate: "2024-08-09",
            trainerCount: 1,
            monthlyMembers: 100,
            attendanceSystemId: "abbc",
            password: "111",
            recommendedCenter: "center A"
        });
    }

    return user;
};

module.exports = { findOrCreateUserKakao, findOrCreateUserNaver};
