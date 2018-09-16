var express = require('express');
var logger = require('../../../logger')
var controller = require('../../../data/sequelize')
var router = express.Router();
var { passport, session } = require('../../../auth')

router.get('/test', function (req, res, next) {
	return res.send('api working');
});

router.get('/', (req, res, next) => {
	let user = req.user
	logger.logMessage('Retrieved user data')
	logger.logData(user)
	if (user) {
		return res.send(user)
	}
	return res.status(404).send('User not logged in')
})

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			logger.logMessage("User probably already logged in")
			return res.status(400).send({ error: 'User not found' })
		}
		req.login(user, (err) => {
			logger.logMessage("User credentials set to:")
			logger.logData(user)
			return res.send(user);
		})
	})(req, res, next)
})


router.get('/logout', (req, res, next) => {
	if (req.user) {
		logger.logMessage('Logging out, user set to inactive')
		controller.user.makeInactive(req.user.id, req.user.email)
		req.logout()
		return res.send('Successfully logged out')
	}
	logger.logMessage('Nothing logged out')
	return res.status(400).send('Have nothing to log out')
})


router.post('/register', async (req, res, next) => {
	logger.logMessage('Trying to register new user: ')
	logger.logData(req.body)

	let props = ['email', 'firstName']

	if (props.every(val => (val in req.body))) {
		logger.logMessage('Request has all neded properties')
		if (!(await controller.user.checkExistance(req.body.email))) {
			logger.logMessage('User doesnt exist')
			let user = await controller.user.create(req.body)
			logger.logMessage('Created user')
			logger.logData(user.get({ plain: true }))
			return res.send(user.get({ plain: true }))
		} else {
			return res.status(403).send('User already exists')
		}
	} else {
		return res.status(400).send('Insufficient request data')
	}

})

router.use((req, res, next) => {
	return req.user ? next() : res.status(401).send('Unauthorized access')
})






module.exports = router;
