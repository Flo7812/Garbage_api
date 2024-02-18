const { DataTypes } = require('sequelize');
<<<<<<< Updated upstream
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
>>>>>>> Stashed changes

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