const GVPCsequelize = require('./GVPCsequelize')
const authDB = require('./authDB')

async function authGuardDB(role){
    if (parseInt(role) === 1){
        const db = require('./GVPAsequelize')
        await GVPCsequelize.close()
            .then(console.log('controler disconnected'))
        await authDB(db)
            .then(console.log('conect admin'))
    }else if(parseInt(role) === 2){
        const db = require('./GVPEsequelize')
        await GVPCsequelize.close()
            .then(console.log('controler disconnected'))
        await authDB(db)
            .then(console.log('conect employee'))
    }else{
        GVPCsequelize.close()
            .then(console.log('unknow user, DB disconnected'))
            .catch((e)=> console.log(e))
    } 
}

module.exports = authGuardDB