const logger = require('../logger')

module.exports = async (controller) => {
    const testUser = {
        firstName: 'test',
        lastName: 'test',
        email: 'testtest@gmail.com',
        password: 'test'
    }

    logger.logTest('Test get')
    let student = await controller.student.create(testUser)
    logger.logData(student.get({ plain: true }))

    logger.logTest('Test addNotification')
    let status = await controller.student.addNotification(1, 'testtest@gmail.com', {
        from: 'CreatorsOfApp',
        description: 'welcome',
        text: 'welcome to the official app'
    })
    logger.logData(`${status} added new notification`)

    logger.logTest('Test get')
    student = await controller.student.get('testtest@gmail.com', 'test')
    logger.logData(student.get({ plain: true }))

    logger.logTest('Test createRazred')
    grade = await controller.grade.create({ name: '3D' })
    logger.logData(grade.get({ plain: true }))

    logger.logTest('Test addUcenikToRazred')
    try {
        status = await controller.grade.addStudent(1, 'testtest@gmail.com', 1)
    } catch (err) {

        logger.logError(err)
    }
    logger.logData(status)

    logger.logTest('Test getRazred')
    grade = await controller.grade.get(1)
    logger.logData(grade.get({ plain: true }))

    logger.logTest('Test inactivate user')
    status = await controller.student.makeInactive(1, 'testtest@gmail.com')
    logger.logMessage(status ? "Successfully inactivated user" : "Failed to inactivate user")

    logger.logTest('Test get')
    student = await controller.student.get('testtest@gmail.com', 'test', logingIn = false)
    logger.logData(student.get({ plain: true }))

    logger.logTest('Test check user existence')
    status = await controller.student.checkExistance('testtest@gmail.com')
    logger.logMessage(`Email testtest@gmail.com exists: ${status}`)
    status = await controller.student.checkExistance('invalidmail@gmail.com')
    logger.logMessage(`Email invalidmail@gmail.com exists: ${status}`)
}