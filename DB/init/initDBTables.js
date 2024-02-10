const sequelize = require('../sequelizeDB')
const DBmodels = require('../Models/index')



async function initDBTables(){

    try {
        
        await require('../Models/associations')
            .then(console.log('connect associations OK'))
            .catch((e)=>console.log('unable to connect associations', e))
        await sequelize.sync({alter: true})
            .then(console.log('Sequelize tables and associations synchronised :', DBmodels))
            .catch((e)=> console.log('Synchronisation Tables error :', e))

        await DBmodels.UserRole.bulkCreate([
            {role: 'admin'},
            {role: 'employee'}
            ])
            .then((res) => res.forEach((data) =>
                console.log(
                    // data,
                    data.dataValues,
                    data.dataValues.id,
                    data.dataValues.role,
                    // data.dataValues instanceof DBmodels.UserRole,
                    // data.dataValues.role instanceof DBmodels.UserRole, 
                    data instanceof DBmodels.UserRole,
                    )
            )).then(console.log('instances USerRole OK'))
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
                )).then(console.log('instances testimonyStatus OK'))
                await DBmodels.User.bulkCreate([
                    {
                        last_name: 'Parrot',
                        first_name: 'Vincent',
                        username: 'VParrot',
                        email: 'vparrot@mail.fr',
                        date_of_birth: 19700131,
                        adress: '12 rue de la voiture',
                        phone: 607080910,
                        password:'vp123',
                        UserRoleId: 1
                    },
                    {
                        last_name: 'Bon',
                        first_name: 'Jean',
                        username: 'JBon',
                        email: 'jbon@mail.fr',
                        date_of_birth: 19801231,
                        adress: '3 rue du cochon',
                        phone: 605040302,
                        password:'e123',
                        UserRoleId: 2
                    },
                    ])
                    .then((res) => res.forEach((data) =>
                        console.log(
                            data.dataValues,
                            data instanceof DBmodels.User,
                            )
                    )).then(console.log('instances User OK'))
            .catch((e)=> console.log('Unable to create instances of Table TestimonyStatus', e))
    } catch (error) {
        console.log('Synchronisation sequelize error :', error)
    }
}



module.exports = initDBTables()