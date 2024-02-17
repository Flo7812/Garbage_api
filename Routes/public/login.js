const express = require('express')
let router = express.Router()
const authTime = require('../../Middleware/out/authTime')
const loginC = require('../../Controllers/auth/loginC')


router.post('',authTime,loginC.login)

router.get('', (req, res)=>{
    res.status(202).send('Peut-etre pour que les employés se connect?')
})

module.exports = router