const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');



const TestimonyStatus = sequelize.define('testimony_Status',{

    id:{
        type: DataTypes.TINYINT,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
    },
    ValidateStatus:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isValidated:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
},{
    timestamps: false,
    freezeTableName: true
})

// TestimonyStatus.sync()

module.exports = TestimonyStatus
// console.log(TestimonyStatus === sequelize.models.TestimonyStatus);