// require('dotenv').config({path: '../../.env'})
const mysql = require('mysql2/promise')

async function initDBServer(){
    
    const myDb = await mysql.createConnection({
        host:process.env.HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB,
        multipleStatements: true,
        })

    try {
        
        await myDb.connect()
            .then(console.log(`connection successful with USER ${myDb.config.user} `))
            .catch(error => console.log(error))

        const [query1] = await myDb.query(`
                DROP USER IF EXISTS '${process.env.GVPA_DB_USER}'@'%';
                DROP USER IF EXISTS '${process.env.GVPE_DB_USER}'@'%';
                DROP USER IF EXISTS '${process.env.GVPC_DB_USER}'@'%';
                DROP DATABASE IF EXISTS ${process.env.GVP_DB};
                SHOW DATABASES;
                SELECT user, host FROM mysql.user;`)
                console.log('database and users destroyed', query1[5], query1[6] )

        const [query2] = await myDb.query(`
                CREATE USER IF NOT EXISTS '${process.env.GVPC_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPC_DB_PASSWORD}';
                CREATE USER IF NOT EXISTS '${process.env.GVPA_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPA_DB_PASSWORD}';
                GRANT SELECT ON ${process.env.GVP_DB}.* TO '${process.env.GVPC_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPC_DB_PASSWORD}';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR '${process.env.GVPA_DB_USER}'@'%';
                GRANT ALL PRIVILEGES ON *.* TO '${process.env.GVPA_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPA_DB_PASSWORD}' WITH GRANT OPTION;
                SHOW GRANTS FOR '${process.env.GVPA_DB_USER}'@'%';
                `)
                console.log(`USER "${process.env.GVPA_DB_USER}"@"%" created and GRANT'`, query2[3], query2[4], query2[6])

        await myDb.end()
            .then(console.log(`${myDb.config.user} disconnected`))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

    const GarageVParrot = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.GVPA_DB_USER,
            password: process.env.GVPA_DB_PASSWORD,
            database: process.env.DB,
            multipleStatements: true,
            })
    try {
        await GarageVParrot.connect()
            .then(console.log(`connection successful with USER ${GarageVParrot.config.user} `))
            .catch(error => console.log(error))
        const [query3] = await GarageVParrot.query(`
                CREATE DATABASE IF NOT EXISTS ${process.env.GVP_DB};
                SHOW DATABASES;
                DROP USER IF EXISTS 'root'@'%';
                CREATE USER IF NOT EXISTS '${process.env.GVPE_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPE_DB_PASSWORD}';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR '${process.env.GVPE_DB_USER}'@'%';
                GRANT SELECT, CREATE, DROP, ALTER ON ${process.env.GVP_DB}.* TO '${process.env.GVPE_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPE_DB_PASSWORD}';
                SHOW GRANTS FOR '${process.env.GVPE_DB_USER}'@'%';
                SELECT user, host FROM mysql.user;`)
                console.log(`DATABASE ${process.env.GVP_DB} and USER "${process.env.GVPE_DB_USER}"@"%" created and GRANT, "root"@"%" destroyed'`,query3[1], query3[4], query3[5], query3[7])
        await GarageVParrot.end() 
            .then(console.log(`${GarageVParrot.config.user} disconnected`))
            .catch(error => console.log(error))

    } catch (error) {
        console.log(error)
    }
}
module.exports = initDBServer()