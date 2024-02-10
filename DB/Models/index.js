const User = require('./User/user')
const Car = require('./Car/car')
const Seller = require('./Car/carSeller')
const Testimony = require('./Testimony/testimony')
const Section = require('./Sections/section')
const TestimonyStatus = require('./Testimony/testimonyStatus')
const UserRole = require('./User/userRole')

const DBmodels = {
        User,
        Car,
        Seller,
        Testimony,
        Section,
        TestimonyStatus,
        UserRole
}

module.exports = DBmodels