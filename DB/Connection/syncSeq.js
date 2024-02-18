const GVP = require('./GVP')

async function sync(){
await GVP.sync()
    .then(()=> console.log('DB synchronization OK'))
    .catch(e=> console.log('Synchronization DB ERROR:',e))
}
sync()