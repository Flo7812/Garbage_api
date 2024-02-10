const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Model = sequelize.define('Model',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.TINYINT,
        allowNull: false
    },
    model:{
        type: DataTypes.TINYINT,
        allowNull: false
    },  
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    }
},{paranoid: true})

module.exports = Model
// console.log(Model === sequelize.models.Model);