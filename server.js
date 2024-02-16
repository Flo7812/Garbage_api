const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 1998

/*********** Server ********************/
const api = express()

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cors());

/********* Databse connection require ****************************/
const DB = require('./DB/connectToDB')

/********** Middlewares requires *********************************/
const checkTokenAccess = require('./Middleware/in/checkTokenAccess')
const checkRoleAccess = require('./Middleware/in/checkRoleAccess')

/********** Start server and DB **********/
api.listen(PORT,()=>{
    console.log(`Server running on PORT: ${PORT} connected`);
    DB()
})

api.get('',(req, res)=>{
    res.status(200).send('Server Express - Garrage Vincent Parrot')
})
/*********** Router Requires **********/

const car_router = require('./Routes/public/cars')
const sections_router = require('./Routes/public/sections')
const testimony_router = require('./Routes/public/testimonials')
const shedules_router = require('./Routes/public/shedules')

const auth_router = require('./Routes/public/auth')
const user_router = require('./Routes/private/users/userManage')
const admin_router = require('./Routes/private/admin/adminManage')



/*********** Router **********/
// api.use('', visitor_router)
api.use('/cars', car_router)
api.use('/sections', sections_router)
api.use('/testimonials', testimony_router)
api.use('/schedules', shedules_router)

api.use('/auth', auth_router)
api.use('/user',checkTokenAccess , user_router)
api.use('/admin',checkTokenAccess , checkRoleAccess, admin_router)


api.get('*',(req, res)=>{
    res.status(404).send('Nothing to do here!')
})