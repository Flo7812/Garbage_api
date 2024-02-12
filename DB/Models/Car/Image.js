const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');
const Car = require('./car');

const Image = sequelize.define('car_image',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    img:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    },
    car:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{paranoid: true})

Image.belongsTo(Car)

// module.exports = Image
// console.log(Image === sequelize.models.Image);
