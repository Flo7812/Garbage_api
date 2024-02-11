const sequelize = require('../sequelizeDB')
const DBmodels = require('../Models/index')



async function initDBTables(){

    try {

        await require('../Models/associations')
            .then(console.log('connect associations OK'))
            .catch((e)=>console.log('unable to connect associations', e))
        await sequelize.sync({force: true})
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
                    ValidateStatus: 'confirmed',
                    isValidated: true
                },
                {
                    ValidateStatus: 'to confirm',
                    isValidated: false
                }
                ])
                .then((res) => res.forEach((data) =>
                    console.log(
                        data.dataValues,
                        data.dataValues.ValidateStatus,
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
                        date_of_birth: '1970-01-31',
                        adress: '12 rue de la voiture',
                        phone: '0607080910',
                        password:'vp123',
                        role: '1'
                    },
                    {
                        last_name: 'Bon',
                        first_name: 'Jean',
                        username: 'JBon',
                        email: 'jbon@mail.fr',
                        date_of_birth: '1980-12-31',
                        adress: '3 rue du cochon',
                        phone: '0605040302',
                        password:'e123',
                        role: '2'
                    },
                    ])
                    .then((res) => res.forEach((data) =>
                        console.log(
                            data.dataValues,
                            data instanceof DBmodels.User,
                            )
                    )).then(console.log('instances User OK'))
                await DBmodels.Testimony.bulkCreate([
                    {
                        author_last_name: 'Homer',
                        author_first_name: 'Simson',
                        author_email: 'HSimson@springfield.com',
                        content: 'C\'est un super garage!!',
                        status: '1',
                        validator:'2'
                    },
                    {
                        author_last_name: 'Jacques',
                        author_first_name: 'Jean',
                        author_email: 'jj@mail.com',
                        content: 'Au top!!',
                        // status: '',
                        // validator:'2', 
                    },
                    {
                        author_last_name: 'Doe',
                        author_first_name: 'Jane',
                        author_email: 'dj@mail.com',
                        content: 'Super!!',
                        status: '1',
                        validator: '1',
                    },
                    ])
                    .then((res) => res.forEach((data) =>
                        console.log(
                            data.dataValues,
                            data instanceof DBmodels.Testimony,
                            )
                    )).then(console.log('instances Testimony OK'))
            .catch((e)=> console.log('Unable to create instances of Table TestimonyStatus', e))
    } catch (error) {
        console.log('Synchronisation sequelize error :', error)
    }
}

module.exports = initDBTables()