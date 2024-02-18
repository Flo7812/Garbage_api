const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');

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
        type: DataTypes.STRING,
        deaultValue: '',
        allowNull: false
    }
},{paranoid: true})

Motor.getName = function(){
    return this.type
}

Motor.getFullMotor = function(){
    return `${this.type} ${this.description}`
}

module.exports = Motor
// console.log(Motor === sequelize.Motors.Model);