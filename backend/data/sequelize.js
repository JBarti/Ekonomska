const logger = require('../logger')
const Sequelize = require('sequelize')
const test = require('./test')


const sequelize = new Sequelize('root', 'postgres', 'admin', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
})


const Student = require('./models/student')(sequelize, Sequelize)
const Grade = require('./models/grade')(sequelize, Sequelize)
const Revenue = require('./models/revenues')(sequelize, Sequelize)
const Expense = require('./models/expenses')(sequelize, Sequelize)

Grade.hasMany(Student)
Student.belongsToMany(Revenue, { through: 'StudentRevenue' })
Revenue.belongsToMany(Student, { through: 'StudentRevenue' })

Student.belongsToMany(Expense, { through: 'StudentExpense' })
Expense.belongsToMany(Student, { through: 'StudentExpense' })

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
                        { model: Expense },
                        { model: Revenue }],
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
        addRevenue: (id, email, revenueId) => {
            return new Promise((resolve, reject) => {
                Controller.revenue.get(revenueId).then(revenue => {
                    Controller.student.getById(id, email).then(student => {
                        student.addRevenue(revenue)
                        resolve('added revenue to student')
                    }).catch(err => {
                        reject(err)
                    })
                }).catch(err => {
                    reject(err)
                })
            })
        },
        addExpense: (id, email, expenseId) => {
            return new Promise((resolve, reject) => {
                Controller.expense.get(expenseId).then(expense => {
                    Controller.student.getById(id, email).then(student => {
                        student.addExpense(expense)
                        resolve('added expense to student')
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
    revenue: {
        create: ({ name, money }) => {
            return Revenue.create({ name, money })
        },
        get: id => {
            return Revenue.find({ where: { id: id } })
        }
    },
    expense: {
        create: ({ name, money }) => {
            return Expense.create({ name, money })
        },
        get: id => {
            return Expense.find({ where: { id: id } })
        }
    }
}



sequelize.sync({ force: true })
    .then(() => {
        console.log('Created databse')
        test(Controller)
        module.exports = { Controller }
    })






module.exports = Controller



