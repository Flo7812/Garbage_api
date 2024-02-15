async function authDB(db){
    try { 
        await db.authenticate()
            .then(()=> console.log('Connection DB success.'))
            // .catch((e)=> console.log('Unable to authenticate :', e))
    } catch (error) {
        console.log(error) 
    } 
}
module.exports = authDB


