const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelizeDB');

const Section = sequelize.define('Section',{
    
    section_id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false    
    },
    img:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    position:{
        type: DataTypes.INTEGER(2),
        allowNull: false
    },
},{
    paranoid: true
});

module.exports = Section
// console.log(Section === sequelize.models.Section);