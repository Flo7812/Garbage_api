const express = require('express')
let router = express.Router()
const messages_router = require('./messages')
const { getCars } = require('../../../Controllers/cars/carsC')
const {getTestimonials} = require('../../../Controllers/testimonials/testimonialsC')

// router.get('',getCars, getTestimonials)
router.use('/messages', messages_router)
router.use('/cardCars', require('./cars/cardsCars'))
router.use('/testimonials', require('./testimonials'))

module.exports = router
