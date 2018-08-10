const logger = require('../logger')
const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const RazredModel = require('./models/razred')
const test = require('./test')


const sequelize = new Sequelize('root', 'postgres', 'admin', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
})

const User = UserModel(sequelize, Sequelize)
const Razred = RazredModel(sequelize, Sequelize)
Razred.hasMany(User)


const Controller = {
    user: {
        createUser: (data) => {
            return User.create(data)
        },

        getUser: (email, password, logingIn = true) => {
            console.log(`Test getUser: \nentered email: ${email} \nentered password: ${password}`)
            let user = User.find(
                {
                    attributes: ['id', 'firstName', 'lastName', 'email', 'notifications'],
                    where: { email: email, password: password }
                })

            User.update({ active: true }, { where: { email: email, password: password } })
                .then(() => { logger.logMessage(`User ${email} set to active`) })
            return user
        },

        addNotification: (ucenikId, ucenikEmail, notification) => {
            if (notification.hasOwnProperty('from', 'description', 'text'))
                return User.update(
                    {
                        notifications: sequelize.fn(
                            'array_append',
                            sequelize.col('notifications'),
                            JSON.stringify(notification))
                    },
                    { where: { id: ucenikId, email: ucenikEmail } })
            else {
                throw new Error(`Invalid notification object ${JSON.stringify(notification)} missing key`)
            }
        }
    },

    razred: {
        create: (data) => {
            return Razred.create(data)
        },
        get: (razredId) => {
            return Razred.find({ where: { id: razredId }, include: { model: User } })
        },
        addUcenik: (ucenikId, ucenikEmail, razredId) => {
            Controller.razred.get(razredId).then(razred => {
                User.find({ where: { email: ucenikEmail, id: ucenikId } }).then(ucenik => {
                    razred.addUser(ucenik)
                })
            })


        }
    }
}



sequelize.sync({ force: true })
    .then(() => {
        console.log('Created databse')
        test(Controller)
        module.exports = { Controller }
    })






module.exports = { Controller }



