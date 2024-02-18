const {Sequelize} = require('sequelize');

const GVP = new Sequelize(process.env.GVP_DB, process.env.GVPA_DB_USER, process.env.GVPA_DB_PASSWORD,{
    host: process.env.HOST,
    dialect: 'mysql',
    logging: false
});


module.exports = GVP