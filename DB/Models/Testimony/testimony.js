const { DataTypes } = require('sequelize');
const sequelize = require('../../connect/GVPAsequelize');


const Testimony = sequelize.define('Testimony',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    author_last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    author_first_name:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    author_email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        },
        unique: true,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    status:{
        type: DataTypes.TINYINT,
        defaultValue: 2, 
        allowNull: false   
    },
    validator:{
        type: DataTypes.INTEGER(11),
    },
    deletedBy:{
        type: DataTypes.INTEGER(11),
    }
},{
    paranoid: true,
    tableName: 'testimonials'
});

// Testimony.sync()

module.exports = Testimony
// console.log(Testimony === sequelize.models.Testimony);