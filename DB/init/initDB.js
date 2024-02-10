require('dotenv').config({path:'../../.env'})
const sequelize = require('../sequelizeDB')

async function initDB(){
    try {
        await require('./initDBServer')
            .then(console.log('connection with initDBServer OK'))
            .catch((e)=>console.log('unable to connect initDBServer',e))
        await require('../DBconnect')
            .then(console.log('start connection with admin on Sequelize OK'))
            .catch((e) =>console.log('unable to connect Sequelize ',e))
        await require('./initDBTables')
            .then(console.log('connection with initDBTables OK'))
            .catch((e)=>console.log('unable to connect initDBtables',e))
        // await require('../Models/associations')
        //     .then(console.log('connection with associations OK'))
        //     .catch((e)=> console.log('Unable to associate',e)) 
    } catch (error) {
        console.log('fatal error on processus:', e);
    }
}

initDB()
    .then(console.log('Processus ok!!'))
    .then(()=>{
        sequelize.close()
            .then(()=> console.log('Connection closed'))
            .catch((e)=> console.log('Unable to disconnect', e))
    })