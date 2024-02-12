const { DataTypes } = require('sequelize');
const sequelize = require('../../GVPAsequelize');

const Motor = sequelize.define('car_motor',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    }
},{paranoid: true})

module.exports = Motor
// console.log(Motor === sequelize.Motors.Model);