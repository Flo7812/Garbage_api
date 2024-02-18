const express = require('express')
let router = express.Router()
<<<<<<< HEAD
const loginC = require('../../Controllers/auth/loginC')
const loginTime = require('../../Middleware/out/loginTime')
// 

router.post('',loginTime ,loginC.login)
=======
const authTime = require('../../Middleware/out/authTime')
const loginC = require('../../Controllers/auth/loginC')


router.post('',authTime,loginC.login)
>>>>>>> origin/ModelControllers

router.get('', (req, res)=>{
    res.status(202).send('Peut-etre pour que les employés se connect?')
})

module.exports = router