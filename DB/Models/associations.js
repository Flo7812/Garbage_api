const {Seller, Car, User, UserRole, Testimony, TestimonyStatus} = require('./index')


async function makeAssociations() {
    console.log("starting  associations");
    try {
        Car.belongsTo(Seller)
        Seller.hasMany(Car,{
            onDelete: 'CASCADE'
        })
        User.belongsTo(UserRole)
        UserRole.hasMany(User)
        console.log('associations comleted');
    } catch (error) {
        console.log('error associations  :', error )
    }
    
}

module.exports = makeAssociations()