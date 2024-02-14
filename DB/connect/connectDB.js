const GVPCsequelize = require('./GVPCsequelize')

async function connectDB(cb, role){
    try { 
        require('../Models/index');
        require('../Models/associations')
        await GVPCsequelize.authenticate() 
            .then(()=> console.log('Connection controler success.'))
            .catch((e)=> console.log('Unable to authenticate :', e))
        // Sync to be used in development mode, doesn't work on oreignKey options...maybe for relations too..
        await GVPCsequelize.sync(/* {alter: true} */)
            .then(()=> console.log('Synchronization DB success.'))
            .catch((e)=> console.log('Unable to sync :', e))
        await cb(role)
    } catch (error) {
        console.log(error)
    } 
}

module.exports = connectDB