const { DataTypes } = require('sequelize');
<<<<<<< Updated upstream
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
>>>>>>> Stashed changes


const Seller = sequelize.define('car_seller',{
    
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
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        },
        unique: true
    },
    phone:{
        type: DataTypes.INTEGER(10).ZEROFILL,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    paranoid: true
});

// Seller.sync()

module.exports = Seller
// console.log(Seller === sequelize.models.Seller);