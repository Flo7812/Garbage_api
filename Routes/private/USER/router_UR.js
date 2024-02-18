const express = require('express')
let router = express.Router()
const cars_router = require('./cars/cars_UR')
const testimony_router = require('./testimonials_UR')
const messages_router = require('./messages_UR')
const logoutC = require('../../../Controllers/auth/logoutC')
const { getValidateTestimonials } = require('../../../Controllers/Testimonials/testimonialsC')


router.get('', getValidateTestimonials)
router.get('/logout', logoutC.logout)

router.use('/cardsCars', cars_router)
router.use('/testimonials', testimony_router)
router.use('/messages', messages_router)

module.exports = router
