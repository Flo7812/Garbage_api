
const {Seller, Car, User, UserRole, Testimony, TestimonyStatus} = require('./index')



async function makeAssociations() {

    console.log("starting  associations");

    try {
        Car.belongsTo(Seller,{
            onDelete: 'CASCADE',
            foreignKey:'seller', 
        })
        Seller.hasMany(Car, {foreignKey: 'seller'})

        User.belongsTo(UserRole,{foreignKey: 'role'})
        UserRole.hasMany(User,{foreignKey:'role'})

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

        console.log('associations completed');
    } catch (error) {
        console.log('error associations  :', error )
    }
}

module.exports = makeAssociations()