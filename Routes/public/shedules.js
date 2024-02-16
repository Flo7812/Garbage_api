const express = require('express')
let router = express.Router()
const { ShedulesTable, ShedulesDays } = require('../../DB/Models');

router.get('',(req, res)=>{
    res.status(200).send('Hello there')
} )

module.exports = router