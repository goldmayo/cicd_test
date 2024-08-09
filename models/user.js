require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    representativeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    centerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    centerType: {
        type: DataTypes.ENUM,
        values: ['퍼블릭', 'PT샵', '퍼블릭 + PT 샵'],
        allowNull: false,
    },
    businessLicense: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    representativeContact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    centerContact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessRegistrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    trainerCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monthlyMembers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    attendanceSystemId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recommendedCenter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    kakaoId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
    },
});

module.exports = User;
