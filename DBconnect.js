const sequelize = require('./sequelizeDB')
const models = require('./Models/index')

async function connectionToDB(CB){
    try { 
        await sequelize.authenticate()
        .then(()=> console.log('Connection DB has been established successfully.'))
        // .then(()=>{
        //     api.listen(process.env.SERVER_PORT,()=>{
        //         console.log(`Server running on PORT: ${process.env.SERVER_PORT} connected`);
        //     })
        // })
        .then(()=> CB())
        .catch((e)=> console.log('Unable to connect to the server', e))
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }

    // await sequelize.close()
    //     .then(()=> console.log('Connection closed'))
    //     .catch((e)=> console.log('Unable to disconnect', e))
}

async function initDB(){
    try {
        await sequelize.sync({alter: true})
            .then((res)=> console.log('Sequelize synchronised :', res.models))
    } catch (error) {
        console.log('Synchronisation sequelize error :', error)
    }
}

module.exports = connectionToDB(initDB)