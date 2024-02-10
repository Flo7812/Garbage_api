const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Motor = sequelize.define('Motor',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    type:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    }
},{paranoid: true})

module.exports = Motor
// console.log(Motor === sequelize.Motors.Model);