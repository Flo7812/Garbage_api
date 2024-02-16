const express = require('express')
let router = express.Router()
const manageUsers_router = require('./managesUsers')
const manageSections_router = require('./manageSections')
const manageShedules_router = require('./manageShedules')

router.get('', (req, res)=>{
    res.send('ici pour manager comme un admin')
})


router.use('/users', manageUsers_router)
router.use('/sections', manageSections_router)
router.use('/schedules', manageShedules_router)

module.exports = router

