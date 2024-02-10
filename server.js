require('dotenv')
const express = require('express')
const cors = require('cors')
// require('./DB/DBconnect')

const PORT = process.env.PORT || 1998

const api = express()
api.use(cors());
api.use(express.json());

api.listen(PORT,()=>{
        console.log(`Server running on PORT: ${PORT} connected`);
    })

api.get('/', (req, res)=>{
    res.status(200).send('Server Express - Sequelize connected!')
})
api.get('*',(req, res)=>{
    res.status(404).send('Nothing to do here!')
})