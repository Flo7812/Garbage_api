const { DataTypes } = require('sequelize');
const sequelize = require('../../../unUsed/GVPAsequelize');



const TestimonyStatus = sequelize.define('Testimony_Status',{

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