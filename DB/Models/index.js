const User = require('./User/user')
const UserRole = require('./User/userRole')
const Car = require('./Car/car')
const Seller = require('./Car/seller')
const Brand = require('./Car/brand')
const Model = require('./Car/model')
const Motor = require('./Car/motor')
const Testimony = require('./Testimony/testimony')
const TestimonyStatus = require('./Testimony/testimonyStatus')
<<<<<<< Updated upstream
const ServicesSection = require('./Sections/servicesSection')
const MainSection = require('./Sections/mainSection')
=======
const Section = require('./Sections/section')
const SectionPage = require('./Sections/sectionPage')
>>>>>>> Stashed changes
const ShedulesTable = require('./Shedules/shedulesTable')
const ShedulesDays = require('./Shedules/shedulesDays')
const Message = require('./Messages/Message')

module.exports =  DBModels = {
        User,
        UserRole,
        Car,
        Seller,
        Brand,
        Model,
        Motor,
        Testimony,
        TestimonyStatus,
<<<<<<< Updated upstream
        ServicesSection,
        MainSection,
=======
        Section,
        SectionPage,
>>>>>>> Stashed changes
        ShedulesTable,
        ShedulesDays,
        Message
        }



