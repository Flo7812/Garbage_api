const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');
const SectionPage = require('./sectionPage')

const Section = sequelize.define('section',{
    
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
        type: DataTypes.INTEGER,
        defaultValue: 0

    },
    page:{
        type: DataTypes.INTEGER,
        allowNull: false,

    }
},{
    paranoid: true
});

Section.belongsTo(SectionPage,{
    onDelete: 'CASCADE',
    foreignKey:'page', 
})
SectionPage.hasMany(Section, {foreignKey: 'page'})

Section.add = async (title, content, img, position, page)=>{

}

Section.afterCreate = async (section)=>{
    //definir default position par id
}


Section.getSectionsByPosition = async (n)=>{

}

Section.getSectionbyPage = async (page)=>{

}

module.exports = Section
// console.log(Section === sequelize.models.Section);