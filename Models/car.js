const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeDB');

const Car = sequelize.define('Car',{

    car_id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    brand:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    model_type:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    kilometers:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    img:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    motor_type:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
        deaultValue: ''
    },
    seller:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
},{paranoid: true})

module.exports = Car
console.log(Car === sequelize.models.Car);