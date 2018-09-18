const logger = require('../logger')
const studentController = require('./student')
const gradeController = require('./grade')
const financeController = require('./finance')

module.exports = async () => {
    const testUser = {
        firstName: 'test',
        lastName: 'test',
        email: 'testtest@gmail.com',
        password: 'test'
    }

    logger.logTest('Test create student')
    let student = await studentController.create(testUser)
    logger.logData(student.get({ plain: true }))

    logger.logTest('Test addNotification')
    let status = await studentController.addNotification(1, 'testtest@gmail.com', {
        from: 'CreatorsOfApp',
        description: 'welcome',
        text: 'welcome to the official app'
    })
    logger.logData(`${status} added new notification`)

    logger.logTest('Test get')
    try {
        student = await studentController.get('testtest@gmail.com', 'test')
        logger.logData(student.get({ plain: true }))
    } catch (err) {
        logger.logError(err)
    }

    logger.logTest('Test createRazred')
    grade = await gradeController.create({ name: '3D' })
    logger.logData(grade.get({ plain: true }))

    logger.logTest('Test addUcenikToRazred')
    try {
        status = await gradeController.addStudent(1, 'testtest@gmail.com', 1)
    } catch (err) {

        logger.logError(err)
    }
    logger.logData(status)

    logger.logTest('Test getRazred')
    grade = await gradeController.get(1)
    logger.logData(grade.get({ plain: true }))

    logger.logTest('Test inactivate user')
    status = await studentController.makeInactive(1, 'testtest@gmail.com')
    logger.logMessage(status ? "Successfully inactivated user" : "Failed to inactivate user")

    logger.logTest('Test get')
    student = await studentController.get('testtest@gmail.com', 'test', logingIn = false)
    logger.logData(student.get({ plain: true }))

    logger.logTest('Test check user existence')
    status = await studentController.checkExistance('testtest@gmail.com')
    logger.logMessage(`Email testtest@gmail.com exists: ${status}`)
    status = await studentController.checkExistance('invalidmail@gmail.com')
    logger.logMessage(`Email invalidmail@gmail.com exists: ${status}`)

    logger.logTest('Test create revenue')
    let revenue = await financeController.create({ name: 'testRevenue', money: 123, type: 'revenue' })
    logger.logMessage('Created new revenue')
    logger.logData(revenue.get({ plain: true }))

    logger.logTest('Test create expense')
    let expense = await financeController.create({ name: 'testExpense', money: 312, type: 'expense' })
    logger.logMessage('Created new expense')
    logger.logData(expense.get({ plain: true }))

    logger.logTest('Test create goal')
    let goal = await financeController.create({ name: 'testGoal', money: 312, type: 'goal' })
    logger.logMessage('Created new goal')
    logger.logData(goal.get({ plain: true }))

    logger.logTest('Add revenue, expense and goal to user')
    status = await studentController.addFinance(1, 'testtest@gmail.com', 1)
    logger.logMessage(status)
    status = await studentController.addFinance(1, 'testtest@gmail.com', 2)
    logger.logMessage(status)
    status = await studentController.addFinance(1, 'testtest@gmail.com', 3)
    logger.logMessage(status)

}