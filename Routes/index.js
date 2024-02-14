const user_router = require('./users')
const car_router = require('./cars')
const testimony_router = require('./testimonials')
const section_router = require('./sections')
const shedules_router = require('./shedules')
const auth_router = require('./auth')

module.exports ={
    user_router,
    car_router,
    testimony_router,
    section_router,
    shedules_router,
    auth_router
}