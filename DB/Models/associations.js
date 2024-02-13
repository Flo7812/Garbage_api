
const {Car, Seller, Brand, Model, Motor, User, UserRole, Testimony, TestimonyStatus} = require('./index')



async function makeAssociations() {

    // console.log("connect associations OK ");

    try {
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

        User.belongsTo(UserRole,{foreignKey: 'role'})
        UserRole.hasMany(User,{foreignKey:'role'})

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

        Testimony.belongsTo(User,{
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            foreignKey: 'validator'
        })
        User.hasMany(Testimony, {foreignKey: 'validator'})

        Testimony.belongsTo(TestimonyStatus,{
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            foreignKey: 'status'
        })
        TestimonyStatus.hasMany(Testimony, {foreignKey:'status'})


    } catch (error) {
        console.log('error associations  :', error )
    }
}

module.exports = makeAssociations()