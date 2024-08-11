require('dotenv').config();
const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     logging: console.log,
// });

// const sequelize = new Sequelize('mydatabase', 'myuser', 'mypassword', {
//     host: 'mysql', // Docker Compose의 MySQL 서비스 이름
//     dialect: 'mysql',
//     // 추가 설정...
// });

const sequelize = new Sequelize('SteinsGate', 'makisekurisu', 'elpsycongroo', {
    host: 'seonlim.c7muuq84guhv.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: console.log,
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
