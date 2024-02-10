require('dotenv').config({path:'../../.env'})
const sequelize = require('../sequelizeDB')

async function initDB(){
    await require('./initDBServer')
        .then('DB + USER created')
        .catch((e)=>console.log(e))
    await require('./initDBTables')
        .then('Tables + instances created')
        .catch((e)=>console.log(e))
    await sequelize.close()
        .then(()=> console.log('Connection closed'))
        .catch((e)=> console.log('Unable to disconnect', e))
}

initDB()