const {Sequelize} = require('sequelize');

const GVPCsequelize = new Sequelize(process.env.GVP_DB, process.env.GVPC_DB_USER, process.env.GVPC_DB_PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql',
    logging: true
});

module.exports = GVPCsequelize