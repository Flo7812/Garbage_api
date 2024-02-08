const {Sequelize} = require('sequelize');

//using DB has already created
const sequelize = new Sequelize(process.env.DB, process.env.USER,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize