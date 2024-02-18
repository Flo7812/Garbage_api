const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');

const SectionPage = sequelize.define('section_page',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    page_name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    paranoid: true,
    freezeTableName: true
});

module.exports = SectionPage
// console.log(Section === sequelize.models.Section);