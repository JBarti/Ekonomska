const logger = require('../logger')
const test = require('./test')

const Controller = {
    student: {
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
                Controller.finance.get(revenueId).then(finance => {
                    Controller.student.getById(id, email).then(student => {
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
    },

    grade: {
        create: ({ name }) => {
            return Grade.create({ name })
        },
        get: (gradeId) => {
            return Grade.find({ where: { id: gradeId }, include: [{ model: Student }] })
        },
        addStudent: (studentId, studentEmail, gradeId) => {
            return new Promise((resolve, reject) => {
                Controller.grade.get(gradeId).then(razred => {
                    Student.find({ where: { email: studentEmail, id: studentId } }).then(student => {
                        grade.addStudent(student)
                        resolve('added student to class')
                    }).catch(err => {
                        reject(err)
                    })
                }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    finance: {
        financeTypes: ['revenue', 'expense', 'goal'],
        create: ({ name, money, type }) => {
            return new Promise((resolve, reject) => {

                if (Controller.finance.financeTypes.includes(type))
                    resolve(Finance.create({ name, money, type }))
                else
                    reject(new TypeError('Invalid finance type'))
            })
        },

        get: id => {
            return Finance.find({ where: { id: id } })
        }
    },
}

sequelize.sync({ force: true })
    .then(() => {
        console.log('Created databse')
        test(Controller)
        module.exports = { Controller }
    })

