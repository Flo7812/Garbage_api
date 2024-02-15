const GVPCsequelize = require('./GVPCsequelize')

async function controltDBconnect(){
    try { 
        require('../DB/Models/index');
        require('../DB/Models/associations')
        await GVPCsequelize.authenticate() 
            .then(()=> console.log('Connection controler success.'))
            .catch((e)=> console.log('Unable to authenticate controler:', e))
        // Sync to be used in development mode, doesn't work on oreignKey options...maybe for relations too..
        await GVPCsequelize.sync(/* {alter: true} */)
            .then(()=> {console.log('Synchronization DB success.')})
            .catch((e)=> console.log('Unable to sync :', e))
    } catch (error) {
        console.log('Error , unable to connect controler :',error)
    } 
}

module.exports = controltDBconnect