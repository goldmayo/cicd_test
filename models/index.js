const sequelize = require('../config/database');
const User = require('./user');

// 다른 모델들도 여기서 불러옴
// const AnotherModel = require('./anotherModel');

const initModels = async () => {
    // create
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
};

module.exports = initModels;
