const { Grade, Student, Finance } = require('./config')


const Controller = {
    financeTypes: ['revenue', 'expense', 'goal'],
    create: ({ name, money, type }) => {
        return new Promise((resolve, reject) => {

            if (Controller.financeTypes.includes(type))
                resolve(Finance.create({ name, money, type }))
            else
                reject(new TypeError('Invalid finance type'))
        })
    },

    get: id => {
        return Finance.find({ where: { id: id } })
    }
}

module.exports = Controller