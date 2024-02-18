const mysql = require('mysql2/promise');
const DB = require('../Connection/mysqlDB')


async function initDBServer(){

    const rootDB = await DB(mysql, process.env.HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB)
    try {
        console.log('Create Processus DBserver START');
        await rootDB.connect()
            .then(()=>console.log(`Connection successful with USER ${rootDB.config.user} `))
            .catch((error) => console.log(`Unable to connect ${rootDB.config.user} :`,error))

        const [query1] = await rootDB.query(
                `DROP DATABASE IF EXISTS ${process.env.GVP_DB};
                SHOW DATABASES;
                DROP USER IF EXISTS '${process.env.GVPA_DB_USER}'@'%';
                DROP USER IF EXISTS '${process.env.GVPE_DB_USER}'@'%';
                DROP USER IF EXISTS '${process.env.GVPC_DB_USER}'@'%';
                SELECT user, host FROM mysql.user;`
                )
                console.log('Databases and users destroyed in dev mode', query1[1], query1[5] )

        const [query2] = await rootDB.query(
                `CREATE USER IF NOT EXISTS '${process.env.GVPA_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPA_DB_PASSWORD}';
                SELECT user,host FROM mysql.user;
                GRANT ALL PRIVILEGES ON *.* TO '${process.env.GVPA_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPA_DB_PASSWORD}' WITH GRANT OPTION;
                SHOW GRANTS FOR '${process.env.GVPA_DB_USER}'@'%';`
                )
                console.log(`USER "${process.env.GVPA_DB_USER}"@"%" created and GRANT'`, query2[1], query2[3])

        await rootDB.end()
            .then(()=>console.log(`${rootDB.config.user} disconnected`))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
    const GVPA_DB = await DB(mysql, process.env.HOST, process.env.GVPA_DB_USER, process.env.GVPA_DB_PASSWORD, process.env.GVPA_DB)
    try {
        await GVPA_DB.connect()
            .then(()=>console.log(`Connection successful with USER ${GVPA_DB.config.user} `))
            .catch(error => console.log(`Unable to connect ${myDb.config.user} :`,error))
        const [query3] = await GVPA_DB.query(
                `CREATE DATABASE IF NOT EXISTS ${process.env.GVP_DB};
                SHOW DATABASES;
                DROP USER IF EXISTS 'root'@'%';
                CREATE USER IF NOT EXISTS '${process.env.GVPE_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPE_DB_PASSWORD}';
                GRANT SELECT,INSERT, UPDATE, CREATE, DELETE, ALTER, REFERENCES ON ${process.env.GVP_DB}.* TO '${process.env.GVPE_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPE_DB_PASSWORD}';
                CREATE USER IF NOT EXISTS '${process.env.GVPC_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPC_DB_PASSWORD}';
                GRANT SELECT, CREATE ON ${process.env.GVP_DB}.* TO '${process.env.GVPC_DB_USER}'@'%' IDENTIFIED BY '${process.env.GVPC_DB_PASSWORD}';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR '${process.env.GVPE_DB_USER}'@'%';
                SHOW GRANTS FOR '${process.env.GVPC_DB_USER}'@'%';`
                )
                console.log(`DATABASE ${process.env.GVP_DB} and USER "${process.env.GVPE_DB_USER}"@"%" created and GRANT, "root"@"%" destroyed'`,query3[1], query3[7], query3[8], query3[9])
        await GVPA_DB.end() 
        .then(()=>console.log(`${GVPA_DB.config.user} disconnected`))
        .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }
}
module.exports = initDBServer()