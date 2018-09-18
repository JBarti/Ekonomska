const { Grade, Student, Finance } = require('./config')
const logger = require('../logger')
const { sequelize } = require('./config')
const financeController = require('./finance')

const Controller = {
    create: ({ firstName, lastName, email, password }) => {
        return Student.create({ firstName, lastName, email, password })
    },

    get: (email, password, logingIn = true) => {
        console.log(`Test get: \nentered email: ${email} \nentered password: ${password}`)
        let student = Student.find(
            {
                attributes: ['id', 'firstName', 'lastName', 'email', 'notifications', 'active'],
                include: [
                    { model: Finance },],
                where: { email: email, password: password }
            })

        if (logingIn) {
            Student.update({ active: true }, { where: { email: email, password: password } })
                .then(() => { logger.logMessage(`User ${email} set to active`) })
        }
        return student
    },
    getById: (id, email) => {
        return Student.find({ where: { id: id, email: email } })
    },
    checkExistance: email => {
        return Student.count({ where: { email: email } })
    },
    addNotification: (id, email, notification) => {
        if (notification.hasOwnProperty('from', 'description', 'text'))
            return Student.update(
                {
                    notifications: sequelize.fn(
                        'array_append',
                        sequelize.col('notifications'),
                        JSON.stringify(notification))
                },
                { where: { id: id, email: email } })
        else {
            throw new Error(`Invalid notification object ${JSON.stringify(notification)} missing key`)
        }
    },
    addFinance: (id, email, revenueId) => {
        return new Promise((resolve, reject) => {
            financeController.get(revenueId).then(finance => {
                Controller.getById(id, email).then(student => {
                    student.addFinance(finance)
                    resolve('added finance to student')
                }).catch(err => {
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    makeInactive: (id, email) => {
        return Student.update({ active: false }, { where: { email: email, id: id } })
    }


}

module.exports = Controller