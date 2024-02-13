// require('dote nv').config() // = {path:'../API/.env'} or {path:'./.env'} // packagejson = -r dotenv/config
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./DB/DBconnect')

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

api.listen(PORT,()=>{
        console.log(`Server running on PORT: ${PORT} connected`);
    })

api.get('/', (req, res)=>{
    res.status(200).send('Server Express - Sequelize connected!')
})

api.use('/user', user_router)
api.use('/car', car_router)
api.use('/testimony', testimony_router)
api.use('/section', section_router)
api.use('/shedules', shedules_router)

api.get('/json', (req, res)=>{
    res.status(200).json({reponse :'ceci est une reponse'})
})
api.get('*',(req, res)=>{
    res.status(404).send('Nothing to do here!')
})