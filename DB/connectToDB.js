const {Sequelize} = require('sequelize');

async function DB(username, password){
    const sequelize = new Sequelize(process.env.GVP_DB, username, password ,{
        host: process.env.HOST,
        dialect: 'mysql',
        logging: false
    })
    await sequelize.authenticate()
    if(sequelize.config.username === process.env.GVPC_DB_USER){
        require('./Models/index');
        require('../unUsed/associations')
        sequelize.sync(/* {alter: true} */)
            .then(()=> {console.log('Synchronization DB success.')})
            .catch((e)=> console.log('Unable to sync :', e))
    }
}
    

function connectToDB(role){
    try {
/****** It's probably a bad idea to disconnect controler. After the last connection, no one else will be able to connect unless the server is restarted  *******/
    // if(sequelize.config.username === process.env.GVPA_DB_USER || sequelize.config.username === process.env.GVPE_DB_USER  ){
    //     sequelize.close()
    //     .then(console.log(process.env.GVPC_DB_USER,' disconnected'))
    //     .catch(console.log('Unable to disconnect ',process.env.GVPC_DB_USER))
    // }
        if(role === 1){
            username = process.env.GVPA_DB_USER
            password = process.env.GVPA_DB_PASSWORD
            DB(username, password)
                .then(console.log('DATABASE connected with :', username ))
                .catch((e)=> console.log('Error to connect :', username, e))
        }else if(role === 2){
            username = process.env.GVPE_DB_USER
            password = process.env.GVPE_DB_PASSWORD
            DB(username, password)
                .then(console.log('DATABASE connected with :', username ))
                .catch((e)=> console.log('Error to connect :', username, e))
        }else{
            username = process.env.GVPC_DB_USER
            password = process.env.GVPC_DB_PASSWORD
            DB(username, password)
                .then(console.log('DATABASE connected with :', username ))
                .catch((e)=> console.log('Error to connect :', username, e))
        }
    } catch (error) {
        console.log('DB connection error:',error);
    }
    
}

    
module.exports = connectToDB








