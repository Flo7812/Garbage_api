const express = require('express')
let router = express.Router()
const cars_router = require('../users/cars')
const testimony_router = require('../users/testimonials')
const {getTestimonials} = require('../../../Controllers/testimonials/testimonialsC')

// router.get('', getTestimonials)

router.use('/cars', cars_router)
router.use('/testimonials', testimony_router)

module.exports = router
