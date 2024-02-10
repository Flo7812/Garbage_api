const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const UserRole = sequelize.define('UserRole',{

    userRole_id:{
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

},{
    timestamps: false,
    tableName: 'user_role'
})

module.exports = UserRole
// console.log(UserRole === sequelize.models.UserRole);