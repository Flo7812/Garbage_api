
async function initDB(){
    try {
        await require('./initDBServer')
            .then(console.log('access to initDBServer OK'))
            .catch((e)=>console.log('unable to access initDBServer',e))
        await require('./initDBTables')
            .then(console.log('access to associations in initTables OK'))
            .catch((e)=>console.log('unable to access initDBtables',e))
    } catch (error) {
        console.log('fatal error on processus:', error);
    }
}

initDB()
