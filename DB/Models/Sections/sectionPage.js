const { DataTypes } = require('sequelize');
<<<<<<< HEAD
const sequelize = require('../../Connection/GVP');

const SectionPage = sequelize.define('section_page',{
=======
const sequelize = require('../../sequelize');

const PageSection = sequelize.define('section-page',{
>>>>>>> origin/ModelControllers
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
<<<<<<< HEAD
    page_name:{
=======
    page:{
>>>>>>> origin/ModelControllers
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    paranoid: true,
<<<<<<< HEAD
    freezeTableName: true
});

module.exports = SectionPage
=======
});

module.exports = PageSection
>>>>>>> origin/ModelControllers
// console.log(Section === sequelize.models.Section);