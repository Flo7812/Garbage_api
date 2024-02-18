const express = require('express')
let router = express.Router()

const {} = require('../../../Controllers/sections/shedulesC')

router.get('',(req, res)=>{
    res.send('FDP!!!')
})

module.exports = router