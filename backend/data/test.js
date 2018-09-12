const logger = require('../logger')

module.exports = async (controller) => {
    const testUser = {
        firstName: 'test',
        lastName: 'test',
        email: 'testtest@gmail.com',
        password: 'test'
    }

    logger.logTest('Test create student')
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
    try {
        student = await controller.student.get('testtest@gmail.com', 'test')
        logger.logData(student.get({ plain: true }))
    } catch (err) {
        logger.logError(err)
    }

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

    logger.logTest('Test create revenue')
    let revenue = await controller.finance.create({ name: 'testRevenue', money: 123, type: 'revenue' })
    logger.logMessage('Created new revenue')
    logger.logData(revenue.get({ plain: true }))

    logger.logTest('Test create expense')
    let expense = await controller.finance.create({ name: 'testExpense', money: 312, type: 'expense' })
    logger.logMessage('Created new expense')
    logger.logData(expense.get({ plain: true }))

    logger.logTest('Test create goal')
    let goal = await controller.finance.create({ name: 'testGoal', money: 312, type: 'goal' })
    logger.logMessage('Created new goal')
    logger.logData(goal.get({ plain: true }))

    logger.logTest('Add revenue, expense and goal to user')
    status = await controller.student.addFinance(1, 'testtest@gmail.com', 1)
    logger.logMessage(status)
    status = await controller.student.addFinance(1, 'testtest@gmail.com', 2)
    logger.logMessage(status)
    status = await controller.student.addFinance(1, 'testtest@gmail.com', 3)
    logger.logMessage(status)

}