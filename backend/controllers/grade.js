const { Grade, Student, Finance } = require('./config')
const logger = require('../logger')

const Controller = {
    create: ({ name }) => {
        return Grade.create({ name })
    },
    get: (gradeId) => {
        return Grade.find({ where: { id: gradeId }, include: [{ model: Student }] })
    },
    addStudent: (studentId, studentEmail, gradeId) => {
        return new Promise((resolve, reject) => {
            Controller.get(gradeId).then(razred => {
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

module.exports = Controller