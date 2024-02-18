const { DataTypes } = require('sequelize');
<<<<<<< HEAD
<<<<<<< Updated upstream
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
>>>>>>> Stashed changes
=======
const sequelize = require('../../sequelize');
>>>>>>> origin/ModelControllers


const ShedulesTable = sequelize.define('shedules_table',{
    
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