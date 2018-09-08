const logger = require('../logger')
const Sequelize = require('sequelize')
const StudentModel = require('./models/student')
const GradeModel = require('./models/grade')
const test = require('./test')


const sequelize = new Sequelize('root', 'postgres', 'admin', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
})

const Student = StudentModel(sequelize, Sequelize)
const Grade = GradeModel(sequelize, Sequelize)
Grade.hasMany(Student)


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
                    where: { email: email, password: password }
                })

            if (logingIn) {
                Student.update({ active: true }, { where: { email: email, password: password } })
                    .then(() => { logger.logMessage(`User ${email} set to active`) })
            }
            return student
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
        makeInactive: (id, email) => {
            return Student.update({ active: false }, { where: { email: email, id: id } })
        }
    },

    grade: {
        create: (data) => {
            return Grade.create(data)
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
    }
}



sequelize.sync({ force: true })
    .then(() => {
        console.log('Created databse')
        test(Controller)
        module.exports = { Controller }
    })






module.exports = Controller



