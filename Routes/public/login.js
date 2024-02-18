const express = require('express')
let router = express.Router()
const loginC = require('../../Controllers/auth/loginC')
const loginTime = require('../../Middleware/out/loginTime')
// 

router.post('',loginTime ,loginC.login)

router.get('', (req, res)=>{
    res.status(202).send('Peut-etre pour que les employés se connect?')
})

module.exports = router