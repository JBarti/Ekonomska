const Sequelize = require('sequelize')


const sequelize = new Sequelize('root', 'postgres', 'admin', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
})


const Student = require('../../data/models/student')(sequelize, Sequelize)
const Grade = require('../../data/models/grade')(sequelize, Sequelize)
const Finance = require('../../data/models/finance')(sequelize, Sequelize)

Grade.hasMany(Student)
Student.belongsToMany(Finance, { through: 'StudentFinance' })
Finance.belongsToMany(Student, { through: 'StudentFinance' })

module.exports = { Student, Grade, Finance }
