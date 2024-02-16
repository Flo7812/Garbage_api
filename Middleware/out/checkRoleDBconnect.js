const connectToDB = require('../../DB/connectToDB')


const checkRoleDBconnect =(req, res, next) =>{
    
    res.on('finish', () =>{
        connectToDB(req.role)
    })
    next()
}
module.exports = checkRoleDBconnect