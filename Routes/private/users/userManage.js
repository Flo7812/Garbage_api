const express = require('express')
let router = express.Router()

router.get('', (req, res)=>{
    res.send('ici pour choisir son manage du jour')
})

router.use('/manage-cars', require('./manageCars'))
router.use('/manage-testimonials', require('./manageTestimonials'))

module.exports = router
