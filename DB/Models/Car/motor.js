const { DataTypes } = require('sequelize');
const sequelize = require('../../init/GVPAsequelize');

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
        deaultValue: '',
        allowNull: false
    }
},{paranoid: true})

module.exports = Motor
// console.log(Motor === sequelize.Motors.Model);