// require('dotenv').config({path: '../.env'})
const {Sequelize} = require('sequelize');

//using DB has already created
const sequelize = new Sequelize(process.env.SDB, process.env.SDB_USER,process.env.SDB_PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize