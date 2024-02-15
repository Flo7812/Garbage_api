const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const DB = require('./DB/connectToDB')

const PORT = process.env.PORT || 1998

const api = express()

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cors());


const user_router = require('./Routes/users')
const car_router = require('./Routes/cars')
const testimony_router = require('./Routes/testimonials')
const section_router = require('./Routes/sections')
const shedules_router = require('./Routes/shedules')
const auth_router = require('./Routes/auth')

api.listen(PORT,()=>{
        console.log(`Server running on PORT: ${PORT} connected`);
        DB()
})

api.get('/', (req, res)=>{
    res.status(200).send('Server Express - Sequelize connected!')
})

api.get('/json', (req, res)=>{
    res.status(200).json({reponse :'ceci est une reponse'})
})

api.use('/user', user_router)
api.use('/car', car_router)
api.use('/testimony', testimony_router)
api.use('/section', section_router)
api.use('/shedules', shedules_router)

api.use('/login', auth_router)

api.get('*',(req, res)=>{
    res.status(404).send('Nothing to do here!')
})