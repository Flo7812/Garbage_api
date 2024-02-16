const { DataTypes } = require('sequelize');
const sequelize = require('../../init/GVPAsequelize');

const MainSection = sequelize.define('section_main',{
    
    id:{
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
        defaultValue: ''
    },
    img:{
        type: DataTypes.BLOB,
        
    },
    position:{
        type: DataTypes.INTEGER(2),
        unique: true

    },
},{
    paranoid: true,
    freezeTableName: true
});

module.exports = MainSection
// console.log(Section === sequelize.models.Section);