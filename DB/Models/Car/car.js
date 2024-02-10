const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const Car = sequelize.define('Car',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    brand:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    model:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    motor:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    kilometers:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    initial_registration:{
        type: DataTypes.DATE,
        allowNull: false
    },
    img:{
        type: DataTypes.BLOB,
        defaultValue: '',
        // allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    },
    // seller:{
    //     type: DataTypes.INTEGER(11),
    //     allowNull: false
    // }
},{paranoid: true})

Car.sync()


module.exports = Car
// console.log(Car === sequelize.models.Car);