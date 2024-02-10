const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const Seller = sequelize.define('Seller',{
    
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
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    // car:{
    //     type: DataTypes.INTEGER,
    //     defaultValue:0,
    //     allowNull:false
    // }
},{
    paranoid: true
});

Seller.sync()

module.exports = Seller
// console.log(Seller === sequelize.models.Seller);