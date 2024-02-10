const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');
// const ShedulesDays = require('./shedulesDays');

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
    description:{
        type: DataTypes.TEXT,
        defaultValue: ''
    }
},{
    paranoid: true
});

// ShedulesTable.hasMany(ShedulesDays)

module.exports = ShedulesTable
// console.log(ShedulesTable === sequelize.models.ShedulesTable);