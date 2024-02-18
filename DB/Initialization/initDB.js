
async function initDB(){
    try {
        await require('./initDBServer')
            .then(()=>console.log('InitDBServer create Processus OK'))
            .catch((e)=>console.log('InitDBServer Processus ERROR',e))
        await require('./initDBTables')
            .then(()=>console.log('InitDBSTabes create Processus OK'))
            .catch((e)=>console.log('InitDBSTables Processus ERROR',e))
    } catch (error) {
        console.log('Fatal ERROR on Processus:', error);
    }
}
initDB()

// module.exports = initDB
