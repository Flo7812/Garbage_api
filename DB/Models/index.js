const User = require('./User/user')
const UserRole = require('./User/userRole')
const Car = require('./Car/car')
const Seller = require('./Car/seller')
const Brand = require('./Car/brand')
const Model = require('./Car/model')
const Motor = require('./Car/motor')
const Testimony = require('./Testimony/testimony')
const TestimonyStatus = require('./Testimony/testimonyStatus')
const Section = require('./Sections/section')
const ShedulesTable = require('./Sections/shedulesTable')
const ShedulesDays = require('./Sections/shedulesDays')

const  DBmodels = {
        User,
        UserRole,
        Car,
        Seller,
        Brand,
        Model,
        Motor,
        Testimony,
        TestimonyStatus,
        Section,
        ShedulesTable,
        ShedulesDays,

}


module.exports = DBmodels