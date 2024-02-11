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
                DROP USER IF EXISTS 'admin'@'%';
                DROP USER IF EXISTS 'employee'@'%';
                DROP DATABASE IF EXISTS sequelize_test;
                CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY ''; 
                GRANT ALL PRIVILEGES ON *.* TO "root"@"%" IDENTIFIED BY '' WITH GRANT OPTION;
                SHOW DATABASES;
                SELECT user, host FROM mysql.user;`)
                console.log('database and users destroyed', query1[5], query1[6] )

        const [query2] = await myDb.query(`
                CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin123';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR 'admin'@'%';
                GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'admin123' WITH GRANT OPTION;
                SHOW GRANTS FOR 'admin'@'%';
                `)
                console.log('USER "admin"@"%" created and GRANT', query2[1], query2[2], query2[4])

        await myDb.end()
            .then(console.log(`${myDb.config.user} disconnected`))
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
    }

    const sequelizeTest = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.SDB_USER,
            password: process.env.SDB_PASSWORD,
            database: process.env.DB,
            multipleStatements: true,
            })
    try {
        await sequelizeTest.connect()
            .then(console.log(`connection successful with USER ${sequelizeTest.config.user} `))
            .catch(error => console.log(error))
        const [query3] = await sequelizeTest.query(`
                CREATE DATABASE IF NOT EXISTS sequelize_test;
                SHOW DATABASES;
                DROP USER IF EXISTS 'root'@'%';
                CREATE USER IF NOT EXISTS 'employee'@'%' IDENTIFIED BY 'e123';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR 'employee'@'%';
                GRANT SELECT, CREATE, DROP, ALTER, INDEX ON sequelize_test.* TO 'employee'@'%' IDENTIFIED BY 'e123';
                SHOW GRANTS FOR 'employee'@'%';
                SELECT user, host FROM mysql.user;`)
                console.log('DATABASE sequelize_test and USER "employee"@"%" created and GRANT, "root"@"%" destroyed',query3[1], query3[4], query3[5], query3[7])
        await sequelizeTest.end() 
            .then(console.log(`${sequelizeTest.config.user} disconnected`))
            .catch(error => console.log(error))

    } catch (error) {
        console.log(error)
    }
}
module.exports = initDBServer()