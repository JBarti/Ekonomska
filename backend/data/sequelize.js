const Sequelize = require('sequelize')
const UserModel = require('./models/user')


const sequelize = new Sequelize('root', 'postgres', 'admin', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
})

const User = UserModel(sequelize, Sequelize)


const Controller = {
    getUser: (data) => {
        console.log('TRIED TP OMSR')
        return User.create(data)
    }
}

function test() {
    Controller.getUser({
        firstName: 'asda',
        lastName: 'ASDASDA',
        email: 'asdsadsa@gmail.com',
        password: 'asdsadasd'
    })
}

sequelize.sync({ force: true })
    .then(() => {
        console.log('Created databse')
        test()
        module.exports = { Controller }
    })






module.exports = { Controller }



