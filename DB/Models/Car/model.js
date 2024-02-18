const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');

const Model = sequelize.define('car_model',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    serie:{
        type: DataTypes.STRING,
        defaultValue:''
    },  
    description:{
        type: DataTypes.STRING,
        deaultValue: ''
    }
},{paranoid: true})

module.exports = Model
// console.log(Model === sequelize.models.Model);