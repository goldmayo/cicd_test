const User = require('../models/user');
const Card = require('../models/card');

exports.updateUserInfo = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedUser = await User.update(req.body, { where: { id } });

        if (updatedUser[0] === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: '회원정보 수정 완료' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePaymentInfo = async (req, res) => {
    try {
        const { userId, cardToken, cardType, lastFourDigits } = req.body;
        const card = await Card.findOne({ where: { userId } });

        if (card) {
            await card.update({ cardToken, cardType, lastFourDigits });
            res.status(200).json({ message: '결제정보 수정 완료' });
        } else {
            await Card.create({ userId, cardToken, cardType, lastFourDigits });
            res.status(201).json({ message: '결제정보 추가 완료' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ['password'],
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};