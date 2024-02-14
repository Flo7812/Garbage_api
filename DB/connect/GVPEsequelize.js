const {Sequelize} = require('sequelize');

const GVPEsequelize = new Sequelize(process.env.GVP_DB, process.env.GVPE_DB_USER, process.env.GVPE_DB_PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = GVPEsequelize