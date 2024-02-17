const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

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
        defaultValue: this.id
    },
    section:{
        type: DataTypes.INTEGER
    }
},{
    paranoid: true
});

module.exports = Section
// console.log(Section === sequelize.models.Section);