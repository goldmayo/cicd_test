const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.registerStep1 = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
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

exports.findId = async (req, res) => {
    try {
        const { representativeName, representativeContact, centerName } = req.query;
        const user = await User.findOne({ where: { representativeName, representativeContact, centerName } });
        if (user) {
            res.status(200).json({ id: user.id });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.findPassword = async (req, res) => {
    try {
        const { representativeName, representativeContact, centerName } = req.query;
        const user = await User.findOne({ where: { representativeName, representativeContact, centerName } });
        if (user) {
            res.status(200).json({ password: user.password });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { id, password } = req.body;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            console.log('###############' + user.password);
        }
        if (bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: '로그인 성공' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
