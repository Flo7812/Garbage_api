const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');

const Brand = sequelize.define('car_brand',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{paranoid: true})


/************* Get All *********************/

Brand.getNames = async function(){
    try {
        const allBrands = []
        const brands = await Brand.findAll()
        for (const brand of brands) {
            allBrands.push(brand.name)    
            }
        return allBrands
    } catch (error) {
        console.log('Error from Model Brand : Can\'t find brands', error)
    }
}

Brand.getIds = async function(){
    try {
        
        const brands = await Brand.findAll({attributes: [id]})
        const allBrands = brands.map(brand => brand.id)
        return allBrands
    } catch (error) {
        console.log('Error from Model Brand : Can\'t find brands', error)
    }
}

/************* Get One *********************/

Brand.getNamebyId = async function(id){
    try {
        const brand = await Brand.findByPk(id)
        return brand.name
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t find this brand with id: ${this.id}`, error)
    }  
}
Brand.getName = function(){
    return this.name
}

Brand.getIdByName = async function(name){
    try {
        const brand = await Brand.findOne({where:{name : name}})
        return brand.id
    } catch (error) {
        return console.log(`Error from Model Brand : Can\'t find this brand :${this.name}`, error)
    }
}

/********* Instance or Modify *********/

Brand.instance = async function(brand){
    try {
        const newBrand = await Brand.create({name : brand})
        if(newBrand){
            return newBrand
        }else{
            throw new Error(`Unable to create this Brand name :${this.brand}`)
        }
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t create this brand : ${this.brand}`, error)
    }
}

Brand.uptdateByName = async function(values, name){
    try {
        const updatedBrand = await Brand.update(values, {where: {name : name}})
        if(updatedBrand ){
            return updatedBrand
        }else{
            throw new Error(`Unable to uptdate this Brand name :${this.name}`)
        }
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t uptadte this brand : ${this.brand}`, error)
    }
}

Brand.uptdateById = async function(values, id){
    try {
        const updatedBrand = await Brand.update(values, {where: {id : id}})
        if(updatedBrand ){
            return updatedBrand
        }else{
            throw new Error(`Unable to uptdate this Brand id :${this.id}`)
        }
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t alter this brand with id : ${this.brand}`, error)
    }
}

/***********Delete Restore and Get Deleted *********/
Brand.softDeleteByName = async function(name){
    try {
        await Brand.destroy({where : {name : name}})
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t soft delete this brand : ${this.name}`, error)
    }   
}

Brand.softDeleteById = async function(id){
    try {
        await Brand.destroy({where : {id : id}})
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t soft delete this brand with id: ${this.id}`, error)
    }   
}

Brand.restoreByName= async function(name){
    try {
        const restoredBrand = await Brand.restore({where : {name : name}})
        if(restoredBrand ){
            return restoredBrand
        }else{
            throw new Error(`Unable to restore this Brand name :${this.name}, wrong name or trash deleted`)
        }
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t restore this brand : ${this.name}`, error)
    }   
}

Brand.restoreById= async function(id){
    try {
        const restoredBrand = await Brand.restore({where : {id : id}})
        if(restoredBrand ){
            return restoredBrand
        }else{
            throw new Error(`Unable to restore this Brand id :${this.id}, wrong id or trash deleted`)
        }
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t restore this brand with id: ${this.id}`, error)
    }   
}

Brand.TrashDeleteByName = async function(name){
    try {
        await Brand.destroy({where : {name : name}, force: true})
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t trash delete this brand : ${this.name}`, error)
    }     
}

Brand.TrashDeleteById = async function(id){
    try {
        await Brand.destroy({where : {id : id}, force: true})
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t trash delete this brand with this id: ${this.id}`, error)
    }     
}

Brand.getAllDeleted= async function(){
    try {
        const deletedBrands = await Brand.findAll({where: { deletedAt: { [Op.ne]: null } }})
        return deletedBrands
    } catch (error) {
        console.log(`Error from Model Brand : Can\'t find deleted brand(s)`, error)
    }
}

module.exports = Brand
// console.log(Brand === sequelize.models.Brand);
