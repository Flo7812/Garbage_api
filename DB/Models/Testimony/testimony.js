const { DataTypes } = require('sequelize');
<<<<<<< Updated upstream
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
>>>>>>> Stashed changes
const TestimonyStatus = require('./testimonyStatus')
const User = require('../User/user')


const Testimony = sequelize.define('testimony',{
    
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

Testimony.belongsTo(User,{
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    foreignKey: 'validator'
})
User.hasMany(Testimony, {foreignKey: 'validator'})

Testimony.belongsTo(TestimonyStatus,{
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    foreignKey: 'status'
})
TestimonyStatus.hasMany(Testimony, {foreignKey:'status'})

module.exports = Testimony
// console.log(Testimony === sequelize.models.Testimony);