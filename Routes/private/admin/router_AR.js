const express = require('express')
let router = express.Router()
const users_router = require('./users_AR')
const sections_router = require('./sections_AR')
const shedules_router = require('./shedules_AR')
const cardsCars_router = require('../USER/cars/cars_UR')
const testimonials_router = require('../USER/testimonials_UR')
const messages_router = require('../USER/messages_UR')
const logoutC = require('../../../Controllers/auth/logoutC')
const {getUsers} = require('../../../Controllers/users/usersC')

router.get('', (req, res)=>{
    
}) 

router.get('/logout', logoutC.logout)

router.use('/dashboard', users_router)
router.use('/users', users_router)
router.use('/sections', sections_router)
router.use('/schedules', shedules_router)
router.use('/cars', cardsCars_router)
router.use('/testimonials', testimonials_router)
router.use('/messages', messages_router)


module.exports = router

