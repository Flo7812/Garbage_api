const express = require('express')
let router = express.Router()
const authTime = require('../../Middleware/in/authTime')
const checkRoleDBconnect = require('../../Middleware/out/checkRoleDBconnect')
const authC = require('../../Controllers/auth/authC')

// user login
router.post('',authTime,checkRoleDBconnect,authC.login)

router.get('', (req, res)=>{
    res.status(202).send('Peut-etre pour que les employés se connect?')
})

module.exports = router