const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const ShedulesTable = sequelize.define('Shedules_Table',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        defaultValue: 'Horaires',
        allowNull: false
    },
    modelWeek:{
        type: DataTypes.TEXT,
        defaultValue: ''
    }
},{
    paranoid: true
});



module.exports = ShedulesTable
// console.log(ShedulesTable === sequelize.models.ShedulesTable);