const express = require('express')
const sequelize = require('./sequelizeDB')

const api = express()

async function connectionToDB(){
    try { 
        await sequelize.authenticate()
        .then(()=> console.log('Connection DB has been established successfully.'))
        .then(()=> console.log('Promise resloved'))
        .then(()=>{
            api.listen(process.env.SERVER_PORT,()=>{
                console.log(`Server on PORT: ${process.env.SERVER_PORT} connected`);
            })
        })
        .catch((e)=> console.log('Unable to connect to the server', e))
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }

    // await sequelize.close()
    //     .then(()=> console.log('Connection closed'))
    //     .catch((e)=> console.log('Unable to disconnect', e))
}
connectionToDB();

api.get('/', (req, res)=>{
    res.status(200).send('Server Sequelize connected!')
})
api.get('*',(req, res)=>{
    res.status(404).send('Nothing to do here!')
})