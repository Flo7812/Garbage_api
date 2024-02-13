const GVPAsequelize = require('./GVPAsequelize')


async function dbConnect(){
    try { 
        require('./Models/index')
        require('./Models/associations')
        await GVPAsequelize.authenticate()
        .then(()=> console.log('Connection DB success.'))
        .catch((e)=> console.log('Unable to authenticate :', e))
        // Sync to be used in development mode, doesn't work on oreignKey options...maybe for relations too..
        GVPAsequelize.sync(/* {alter: true} */)
        .then(()=> console.log('Synchronization DB success.'))
        .catch((e)=> console.log('Unable to authenticate :', e))
    } catch (error) {
        console.log('Unable to connect to the database', error)
    } 
}
module.exports = dbConnect()


