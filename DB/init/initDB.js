// require('dotenv').config({path:'../../.env'})
const GVPAsequelize = require('../GVPAsequelize')


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
    } catch (error) {
        console.log('fatal error on processus:', error);
    }
}

initDB()
    .then(console.log('Processus ok!!'))
    .then(()=>{
        GVPAsequelize.close()
            .then(()=> console.log('Connection closed'))
            .catch((e)=> console.log('Unable to disconnect', e))
    })