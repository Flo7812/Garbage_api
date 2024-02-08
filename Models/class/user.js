const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const User = sequelize.define({
    
    user_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
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
    date_of_birth:{
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
    paranoid: true
});

module.exports = User
console.log(User === sequelize.models.User);