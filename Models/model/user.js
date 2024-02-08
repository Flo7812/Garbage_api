const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../sequelizeDB');

class User extends Model{}

User.init({

    user_id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    lastName:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING(255),
        allowNull: false    
    },
    pseudo:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        },
        unique: true
    },
    dateOfBirth:{
        type: DataTypes.DATE,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
},{
    sequelize, 
    modelName: 'User'
});

module.exports = User
console.log(User === sequelize.models.User);
