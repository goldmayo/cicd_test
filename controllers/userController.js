const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.registerStep1 = async (req, res) => {
    try {
        console.log(`Original password: ${req.body.password}`); // 원본 비밀번호 출력

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        console.log(`Hashed password: ${hashedPassword}`); // 해시된 비밀번호 출력

        const user = await User.create({...req.body, password: hashedPassword});
        console.log(`Entered password (with length): '${req.body.password}' (${req.body.password.length})`);

        res.status(201).json({message: '가입1 완료. ID 생성됨.', userId: user.id});
    } catch (error) {
        console.error('Error during registration:', error); // 오류 로그 출력
        res.status(400).json({error: error.message});
    }
};


exports.registerStep2 = async (req, res) => {
    try {
        const {userId, centerType, trainerCount, ptMembers, moreThanEleven, monthlyPT} = req.body;
        const user = await User.findByPk(userId);
        if (user) {
            await user.update({centerType, trainerCount, ptMembers, moreThanEleven, monthlyPT});
            res.status(201).json({message: '가입2 완료. 추가 정보 입력됨.'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.findId = async (req, res) => {
    try {
        const {representativeName, representativeContact, centerName} = req.query;
        const user = await User.findOne({where: {representativeName, representativeContact, centerName}});
        if (user) {
            res.status(200).json({id: user.id});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.findPassword = async (req, res) => {
    try {
        const {representativeName, representativeContact, centerName} = req.query;
        const user = await User.findOne({where: {representativeName, representativeContact, centerName}});
        if (user) {
            res.status(200).json({password: user.password});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        const { id, password } = req.body;
        console.log(`Received login request for user ID: ${id}`);
        console.log(`Entered password: ${password}`); // 입력된 비밀번호 출력
        console.log(`Entered password (with length): '${password}' (${password.length})`);

        // 데이터베이스에서 사용자 찾기
        const user = await User.findOne({ where: { id } });
        console.log(`Database query result for user ID: ${id}`, user);

        if (!user) {
            console.log('User not found with the provided ID');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`Input password: ${password}`);
        console.log(`Stored hashed password: ${user.password}`);

        const hashedPassword = bcrypt.hash(password, 10);
        console.log(hashedPassword);

        if (hashedPassword === user.password) {
            console.log('Invalid password provided');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        console.log(`Generated JWT token for user ID: ${id}`);

        // 성공적으로 로그인한 경우 토큰과 함께 응답
        return res.status(200).json({
            message: '로그인 성공',
            token
        });

    } catch (error) {
        console.error('Error during login process:', error);
        return res.status(400).json({ error: error.message });
    }
};
