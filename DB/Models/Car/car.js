const { DataTypes } = require('sequelize');
const sequelize = require('../../GVPAsequelize');


const Car = sequelize.define('Car',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    brand:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    model:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    motor:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kilometers:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    initial_registration:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    },
    seller:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    img:{
        type: DataTypes.BLOB,
        defaultValue: '',
        // allowNull: false
    },
    createdBy:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    deletedBy:{
        type: DataTypes.INTEGER(11),
    }
},{paranoid: true})

// Car.sync()

module.exports = Car
// console.log(Car === sequelize.models.Car);