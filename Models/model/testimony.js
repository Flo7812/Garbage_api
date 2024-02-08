const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Testimony = sequelize.define('Testimony',{
    
    testimony_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    author_lastName:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author_firstName:{
        type: DataTypes.STRING(255),
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
    paranoid: true
});

module.exports = Testimony
console.log(Testimony === sequelize.models.Testimony);