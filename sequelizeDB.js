const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('sequelize_test', 'root','',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

async function connectionToDB(){
    try { 
        await sequelize.authenticate()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
}
connectionToDB()