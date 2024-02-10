const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const TestimonyStatus = sequelize.define('TestimonyStatus',{

    testimonySatus_id:{
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
    },
    validatedStatus:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isValidated:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: true
    }

},{
    timestamps: false,
    tableName: 'testimony_status'
})


module.exports = TestimonyStatus
// console.log(TestimonyStatus === sequelize.models.TestimonyStatus);