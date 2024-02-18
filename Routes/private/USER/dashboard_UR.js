const express = require('express')
let router = express.Router()
const messages_router = require('./messages_UR')
const cardCars_router = require('./cars/cardsCars')
const testimonials_router = require('./testimonials_UR')
// const { getCars } = require('../../../Controllers/cars/carsC')
// const {getTestimonials} = require('../../../Controllers/testimonials/testimonialsC')

// router.get('',getCars, getTestimonials)
router.use('/messages', messages_router)
router.use('/cardCars', cardCars_router)
router.use('/testimonials', testimonials_router)

module.exports = router
