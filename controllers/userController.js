const User = require('../models/user');

exports.registerStep1 = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: '가입1 완료. ID 생성됨.', userId: user.id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.registerStep2 = async (req, res) => {
    try {
        const { userId, centerType, trainerCount, ptMembers, moreThanEleven, monthlyPT } = req.body;
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({ centerType, trainerCount, ptMembers, moreThanEleven, monthlyPT });
            res.status(201).json({ message: '가입2 완료. 추가 정보 입력됨.' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
};
