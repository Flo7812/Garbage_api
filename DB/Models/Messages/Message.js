const { DataTypes } = require('sequelize')
const sequelize = require('../../Connection/GVP')
const Car = require('../Car/car')

const Message = sequelize.define('message',{

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sender_first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sender_email: {
        type: DataTypes.STRING,
        validate:{
            isEmail: true
        },
    },
    sender_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    object:{
        type: DataTypes.STRING,
        allowNull: false
    },
    refCar:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    paranoid: true
}
)
Message.belongsTo(Car, {foreignKey: 'ref'})
Car.hasMany(Message, {foreignKey:'ref'})

module.exports = Message