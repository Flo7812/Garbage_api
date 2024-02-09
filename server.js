const express = require('express')
const cors = require('cors')
require('./DBconnect')

const api = express()
api.use(cors());
api.use(express.json());

api.listen(process.env.SERVER_PORT,()=>{
        console.log(`Server running on PORT: ${process.env.SERVER_PORT} connected`);
    })

api.get('/', (req, res)=>{
    res.status(200).send('Server Express - Sequelize connected!')
})
api.get('*',(req, res)=>{
    res.status(404).send('Nothing to do here!')
})