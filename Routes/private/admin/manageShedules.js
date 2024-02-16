const express = require('express')
let router = express.Router()
const  SchedulesTable  = require('../../../DB/Models/Shedules/shedulesTable');
const  SchedulesDay  = require('../../../DB/Models/Shedules/shedulesDays');
const {} = require('../../../Controllers/sections/shedulesC')

router.get('',(req, res)=>{
    res.send('FDP!!!')
})

module.exports = router