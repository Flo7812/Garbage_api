const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Brand = sequelize.define('Brand',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{paranoid: true})

module.exports = Brand
// console.log(Brand === sequelize.models.Brand);
