const { DataTypes } = require('sequelize');
<<<<<<< HEAD:DB/Models/Sections/servicesSection.js
<<<<<<< Updated upstream:DB/Models/Sections/servicesSection.js
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
const SectionPage = require('./sectionPage')
>>>>>>> Stashed changes:DB/Models/Sections/section.js
=======
const sequelize = require('../../sequelize');
>>>>>>> origin/ModelControllers:DB/Models/Sections/section.js

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
<<<<<<< HEAD:DB/Models/Sections/servicesSection.js
<<<<<<< Updated upstream:DB/Models/Sections/servicesSection.js
        type: DataTypes.INTEGER(2),

    },
=======
        type: DataTypes.INTEGER,
        defaultValue: 0

    },
    page:{
        type: DataTypes.INTEGER,
        allowNull: false,

    }
>>>>>>> Stashed changes:DB/Models/Sections/section.js
=======
        type: DataTypes.INTEGER,
        defaultValue: this.id
    },
    section:{
        type: DataTypes.INTEGER
    }
>>>>>>> origin/ModelControllers:DB/Models/Sections/section.js
},{
    paranoid: true
});

<<<<<<< HEAD:DB/Models/Sections/servicesSection.js
<<<<<<< Updated upstream:DB/Models/Sections/servicesSection.js
module.exports = ServicesSection
=======
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
>>>>>>> Stashed changes:DB/Models/Sections/section.js
=======
module.exports = Section
>>>>>>> origin/ModelControllers:DB/Models/Sections/section.js
// console.log(Section === sequelize.models.Section);