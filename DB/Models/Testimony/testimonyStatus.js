const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');


const TestimonyStatus = sequelize.define('Testimony_Status',{

    id:{
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
    freezeTableName: true
})


module.exports = TestimonyStatus
// console.log(TestimonyStatus === sequelize.models.TestimonyStatus);