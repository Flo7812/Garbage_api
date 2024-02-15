const GVPCsequelize = require('./GVPCsequelize')
const authDB = require('./authDB')

async function authGuardDB(role, username){
    console.log("Utilisateur :", GVPCsequelize.config.username)
    if(GVPCsequelize.config.username === 'controler'){
        try {
            if (parseInt(role) === 1){
                const db = require('./GVPAsequelize')
                await GVPCsequelize.close()
                    .then(()=> {console.log('controler disconnected')
                        authDB(db)
                            .then(console.log(`${username} connected`))
                            .catch(e=> console.log(`unable to connect ${username}:`, e))
                    }) 
            }else if(parseInt(role) === 2){
                const db = require('./GVPEsequelize')
                await GVPCsequelize.close()
                    .then(()=>{
                        console.log('controler disconnected')
                        authDB(db)
                            .then(console.log(`${username} connected`))
                            .catch(e=> console.log(`unable to connect ${username}:`, e))
                    })
                
            }else{
                await GVPCsequelize.close()
                    .then(console.log('unknow user, DB disconnected'))
                    .catch((e)=> console.log(e))
            } 
        } catch (error) {
            console.log(error);
        }
    }else{
        if(GVPCsequelize.config.username === 'controler'){
            try {
                
            } catch (error) {
                
            }
        }
    }
}

module.exports = authGuardDB