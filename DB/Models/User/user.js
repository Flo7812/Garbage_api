const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const User = sequelize.define('User',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    username:{
        type: DataTypes.STRING,
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
        type: DataTypes.INTEGER(10).ZEROFILL,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(128),
        allowNull: false
    },
    role:{
        type: DataTypes.TINYINT, 
        allowNull: false
    }
},{
    paranoid: true
});

// User.sync()

module.exports = User
// console.log(User === sequelize.models.User);