const express = require('express')
let router = express.Router()

router.get('', (req, res)=>{
    res.send('ici pour choisir son manage du jour')
})

router.use('/cars', require('./manageCars'))
router.use('/testimonials', require('./manageTestimonials'))

module.exports = router
