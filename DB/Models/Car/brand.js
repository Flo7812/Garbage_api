const { DataTypes } = require('sequelize');
const sequelize = require('../../connect/GVPAsequelize');

const Brand = sequelize.define('car_brand',{

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
