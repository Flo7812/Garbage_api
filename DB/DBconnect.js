const sequelize = require('./sequelizeDB')

async function dbConnect(){
    try { 
        await sequelize.authenticate()
        .then(()=> console.log('Connection sequelize DB has been established successfully.'))
        .catch((e)=> console.log('Unable to :', e))
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }
    // await sequelize.close()
    //     .then(()=> console.log('Connection closed'))
    //     .catch((e)=> console.log('Unable to disconnect', e))
}

module.exports = dbConnect()