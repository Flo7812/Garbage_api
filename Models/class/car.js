const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelizeDB');

class Car extends Model{}

Car.init({
    car_id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    brand:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    modelName:{
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
    motorType:{
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
},{
    sequelize,
    modelName: 'Car'
})

module.exports = Car
console.log(Car === sequelize.models.Car);
