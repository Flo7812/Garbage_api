const express = require('express')
let router = express.Router()
const users_router = require('./users')
const sections_router = require('./sections')
const shedules_router = require('./shedules')
const cardsCars_router = require('../users/cars/cardsCars')
const testimony_router = require('../users/testimonials')
const {getUsers} = require('../../../Controllers/users/usersC')

router.get('', getUsers) 

router.use('/dashboard', users_router)
router.use('/users', users_router)
router.use('/sections', sections_router)
router.use('/schedules', shedules_router)
router.use('/cars', cardsCars_router)
router.use('/testimonials', testimony_router)


module.exports = router

