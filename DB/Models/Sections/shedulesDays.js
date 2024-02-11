const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const ShedulesDays = sequelize.define('Shedules_Days',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    Days:{
        type: DataTypes.STRING,
        defaultValue: ''
    },
    shedules:{
        type: DataTypes.STRING,
        allowNull: false
    },
    position:{
        type: DataTypes.INTEGER(2),
    },
},{
    paranoid: true
});



module.exports = ShedulesDays
// console.log(ShedulesDays === sequelize.models.ShedulesDays);