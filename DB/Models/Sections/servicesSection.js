const { DataTypes } = require('sequelize');
const sequelize = require('../../init/GVPAsequelize');

const ServicesSection = sequelize.define('section_service',{
    
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

    },
},{
    paranoid: true
});

module.exports = ServicesSection
// console.log(Section === sequelize.models.Section);