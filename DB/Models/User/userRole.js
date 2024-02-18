const { DataTypes } = require('sequelize');
<<<<<<< Updated upstream
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
>>>>>>> Stashed changes


const UserRole = sequelize.define('User_Role',{

    id:{
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
    },
},{
    timestamps: false,
})


module.exports = UserRole
// console.log(UserRole === sequelize.models.UserRole);