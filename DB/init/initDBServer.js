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

        /* const [query1] = await myDb.query(`
                DROP USER IF EXISTS 'admin'@'%';
                DROP USER IF EXISTS 'employee'@'%';
                DROP DATABASE IF EXISTS sequelize_test;
                SHOW DATABASES;
                SELECT user, host FROM mysql.user;`)
                console.log('database and user destroys', query1[3], query1[4] ) */

        const [query2] = await myDb.query(`
                SHOW DATABASES;
                SELECT user, host FROM mysql.user;
                CREATE USER IF NOT EXISTS 'admin'@'%' IDENTIFIED BY 'admin123';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR 'admin'@'%';
                GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' IDENTIFIED BY 'admin123' WITH GRANT OPTION;
                SHOW GRANTS FOR 'admin'@'%';
                `)
                console.log('USER "admin"@"%" created', query2[0], query2[1], query2[3],query2[4], query2[6])

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
                CREATE USER IF NOT EXISTS 'employee'@'%' IDENTIFIED BY 'e123';
                SELECT user, host FROM mysql.user;
                SHOW GRANTS FOR 'employee'@'%';
                GRANT SELECT ON sequelize_test.* TO 'employee'@'%' IDENTIFIED BY 'e123';
                SHOW GRANTS FOR 'employee'@'%';
                SELECT user, host FROM mysql.user;`)
                console.log('DATABASE sequelize_test and USER "employee"@"%" created',query3[2], query3[3], query3[5])
        await sequelizeTest.end() 
            .then(console.log(`${sequelizeTest.config.user} disconnected`))
            .catch(error => console.log(error))

    } catch (error) {
        console.log(error)
    }

}
module.exports = initDBServer()