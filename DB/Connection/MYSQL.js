async function DB(mysql, host, user, pass, db){
    const DB = await mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: db,
        multipleStatements: true,
        })
        return  DB
}
module.exports = DB