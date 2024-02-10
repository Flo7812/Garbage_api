const sequelize = require('../sequelizeDB')
const DBmodels = require('../Models/index')


async function initDBTables(){

    try {
        await require('../DBconnect')

        await sequelize.sync({force: true})
            .then(console.log('Sequelize tables synchronised :', DBmodels))
            .catch((e)=> console.log('Synchronisation Tables error :', e))

        await DBmodels.UserRole.bulkCreate([
            {role: 'admin'},
            {role: 'employee'}
            ])
            .then((res) => res.forEach((data) =>
                console.log(
                    // data,
                    data.dataValues,
                    data.dataValues.userRole_id,
                    data.dataValues.role,
                    // data.dataValues instanceof DBmodels.UserRole,
                    // data.dataValues.role instanceof DBmodels.UserRole, 
                    data instanceof DBmodels.UserRole,
                    )
            ))
            .catch((e)=> console.log('Unable to create instances of Table UserRole', e))
            await DBmodels.TestimonyStatus.bulkCreate([
                {
                    validatedStatus: 'confirmed',
                    isValidated: true
                },
                {
                    validatedStatus: 'to confirm',
                    isValidated: false
                }
                ])
                .then((res) => res.forEach((data) =>
                    console.log(
                        data.dataValues,
                        data.dataValues.validatedStatus,
                        data.dataValues.isValidated,
                        data instanceof DBmodels.TestimonyStatus,
                        )
                ))
            .catch((e)=> console.log('Unable to create instances of Table TestimonyStatus', e))
    } catch (error) {
        console.log('Synchronisation sequelize error :', error)
    }
}



module.exports = initDBTables()