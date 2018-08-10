const logger = require('../logger')

module.exports = async (controller) => {
    const testUser = {
        firstName: 'test',
        lastName: 'test',
        email: 'testtest@gmail.com',
        password: 'test'
    }

    logger.logTest('Test createUser')
    let user = await controller.user.createUser(testUser)
    logger.logData(user.get({ plain: true }))

    logger.logTest('Test addNotification')
    let status = await controller.user.addNotification(1, 'testtest@gmail.com', {
        from: 'CreatorsOfApp',
        description: 'welcome',
        text: 'welcome to the official app'
    })
    logger.logData(`${status} added new notification`)

    logger.logTest('Test getUser')
    user = await controller.user.getUser('testtest@gmail.com', 'test')
    logger.logData(user.get({ plain: true }))

    logger.logTest('Test createRazred')
    razred = await controller.razred.create({ name: '3D' })
    logger.logData(razred.get({ plain: true }))

    logger.logTest('Test addUcenikToRazred')
    razred = await controller.razred.addUcenik(1, 'testtest@gmail.com', 1)
    logger.logData(razred)

    logger.logTest('Test getRazred')
    razred = await controller.razred.get(1)
    logger.logData(razred.get({ plain: true }))
}