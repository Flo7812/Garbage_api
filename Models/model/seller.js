const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Seller = sequelize.define({
    
    seller_id:{
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
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        },
        unique: true
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
},{
    paranoid: true
});

module.exports = Seller
console.log(Seller === sequelize.models.Seller);