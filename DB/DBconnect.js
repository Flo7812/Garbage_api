
const GVPAsequelize = require('./GVPAsequelize')

async function dbConnect(){
    try { 
        await GVPAsequelize.authenticate()
        .then(()=> console.log('Connection sequelize DB has been established successfully.'))
        .catch((e)=> console.log('Unable to authenticate :', e))
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }
    
    GVPAsequelize.sync().then(console.log('Sync databases ok')).catch((e)=> console.log('database sync error:', e))
}


module.exports = dbConnect()

/* async function dbConnect(db){
    try { 
        await db.authenticate()
        .then(()=> console.log('Connection sequelize DB has been established successfully.'))
        .catch((e)=> console.log('Unable to :', e))
    } catch (error) {
        console.log('Unable to connect to the database', error)
    }

}

module.exports = dbConnect(GVPAsequelize) */