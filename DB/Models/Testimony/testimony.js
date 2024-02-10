const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Testimony = sequelize.define('Testimony',{
    
    testimony_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    author_last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    author_first_name:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    isValidated:{
        type: DataTypes.BOOLEAN,
        allowNull: false,    
    },
    validator:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
},{
    paranoid: true,
    tableName: 'testimonials'
});

module.exports = Testimony
// console.log(Testimony === sequelize.models.Testimony);