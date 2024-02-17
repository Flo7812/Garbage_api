const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

const PageSection = sequelize.define('section-page',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    page:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    paranoid: true,
});

module.exports = PageSection
// console.log(Section === sequelize.models.Section);