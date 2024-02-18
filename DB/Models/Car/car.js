const { DataTypes } = require('sequelize');
const sequelize = require('../../Connection/GVP');
const Seller = require('./seller')
const Brand = require('./brand')
const Model = require('./model')
const Motor = require('./motor')
const User = require('../User/user')



const Car = sequelize.define('Car',{

    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    ref:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:'',
        unique: true
    },
    brand:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    model:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    motor:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    kilometers:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    initial_registration:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        deaultValue: ''
    },
    seller:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    img:{
        type: DataTypes.BLOB,
        defaultValue: '',
        // allowNull: false
    },
    createdBy:{
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    deletedBy:{
        type: DataTypes.INTEGER(11),
    }
},{paranoid: true})

Car.belongsTo(Seller,{
    onDelete: 'CASCADE',
    foreignKey:'seller', 
})
Seller.hasMany(Car, {foreignKey: 'seller'})

Car.belongsTo(Brand,{
    onDelete: 'CASCADE',
    foreignKey:'brand', 
})
Brand.hasMany(Car, {foreignKey: 'brand'})

Car.belongsTo(Model,{
    onDelete: 'CASCADE',
    foreignKey:'model', 
})
Model.hasMany(Car, {foreignKey: 'model'})

Car.belongsTo(Motor,{
    onDelete: 'CASCADE',
    foreignKey:'motor', 
})
Motor.hasMany(Car, {foreignKey: 'motor'})

Car.belongsTo(User,{
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    foreignKey:'createdBy', 
})
User.hasMany(Car, {foreignKey: 'createdBy'})

Car.belongsTo(User,{
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
    foreignKey:'deletedBy', 
})
User.hasMany(Car, {foreignKey: 'deletedBy'})

Car.createRef = async function(){

}

Car.createCar = async function(){
    try {
        
    } catch (error) {
        
    }
}

Car.getCarByRef

Car.afterRestore = async function(){

}


Car.getDisplayCard = async function(){

}

Car.getDisplayCards = async function(){
    
}

/************* Get All *********************/

// Car.getNames = async function(){
//     try {
//         const allCars = []
//         const Cars = await Car.findAll()
//         for (const Car of Cars) {
//             allCars.push(Car.name)    
//             }
//         return allCars
//     } catch (error) {
//         console.log('Error from Model Car : Can\'t find Cars', error)
//     }
// }

// Car.getIds = async function(){
//     try {
        
//         const Cars = await Car.findAll({attributes: [id]})
//         const allCars = Cars.map(Car => Car.id)
//         return allCars
//     } catch (error) {
//         console.log('Error from Model Car : Can\'t find Cars', error)
//     }
// }

// /************* Get One *********************/

// Car.getNamebyId = async function(id){
//     try {
//         const Car = await Car.findByPk(id)
//         return Car.name
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t find this Car with id: ${this.id}`, error)
//     }  
// }

// Car.getIdByName = async function(name){
//     try {
//         const Car = await Car.findOne({where:{name : name}})
//         return Car.id
//     } catch (error) {
//         return console.log(`Error from Model Car : Can\'t find this Car :${this.name}`, error)
//     }
// }

// /********* Instance or Modify *********/

// Car.instance = async function(body){
//     try {
//         const newCar = await Car.create(body)
//         if(newCar){
//             return newCar
//         }else{
//             throw new Error(`Unable to create this Car name :${this.Car}`)
//         }
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t create this Car : ${this.Car}`, error)
//     }
// }

// Car.uptdateByName = async function(values, name){
//     try {
//         const updatedCar = await Car.update(values, {where: {name : name}})
//         if(updatedCar ){
//             return updatedCar
//         }else{
//             throw new Error(`Unable to uptdate this Car name :${this.name}`)
//         }
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t uptadte this Car : ${this.Car}`, error)
//     }
// }

// Car.uptdateById = async function(values, id){
//     try {
//         const updatedCar = await Car.update(values, {where: {id : id}})
//         if(updatedCar ){
//             return updatedCar
//         }else{
//             throw new Error(`Unable to uptdate this Car id :${this.id}`)
//         }
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t alter this Car with id : ${this.Car}`, error)
//     }
// }

// /***********Delete Restore and Get Deleted *********/
// Car.softDeleteByName = async function(name){
//     try {
//         await Car.destroy({where : {name : name}})
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t soft delete this Car : ${this.name}`, error)
//     }   
// }

// Car.softDeleteById = async function(id){
//     try {
//         await Car.destroy({where : {id : id}})
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t soft delete this Car with id: ${this.id}`, error)
//     }   
// }

// Car.restoreByName= async function(name){
//     try {
//         const restoredCar = await Car.restore({where : {name : name}})
//         if(restoredCar ){
//             return restoredCar
//         }else{
//             throw new Error(`Unable to restore this Car name :${this.name}, wrong name or trash deleted`)
//         }
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t restore this Car : ${this.name}`, error)
//     }   
// }

// Car.restoreById= async function(id){
//     try {
//         const restoredCar = await Car.restore({where : {id : id}})
//         if(restoredCar ){
//             return restoredCar
//         }else{
//             throw new Error(`Unable to restore this Car id :${this.id}, wrong id or trash deleted`)
//         }
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t restore this Car with id: ${this.id}`, error)
//     }   
// }

// Car.TrashDeleteByName = async function(name){
//     try {
//         await Car.destroy({where : {name : name}, force: true})
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t trash delete this Car : ${this.name}`, error)
//     }     
// }

// Car.TrashDeleteById = async function(id){
//     try {
//         await Car.destroy({where : {id : id}, force: true})
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t trash delete this Car with this id: ${this.id}`, error)
//     }     
// }

// Car.getAllDeleted= async function(){
//     try {
//         const deletedCars = await Car.findAll({where: { deletedAt: { [Op.ne]: null } }})
//         return deletedCars
//     } catch (error) {
//         console.log(`Error from Model Car : Can\'t find deleted Car(s)`, error)
//     }
// }


module.exports = Car
// console.log(Car === sequelize.models.Car);