const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Card = sequelize.define('Card', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cardType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastFourDigits: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'cards',
    timestamps: false,
});

module.exports = Card;
