//Dependencies
var createError = require('http-errors')
var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('./logger')
var controller = require('./data/sequelize')
var bodyParser = require('body-parser')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var expressSession = require('express-session')
var FileStore = require('session-file-store')(expressSession)
var { passport, session } = require('./auth')


//Routes
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/students')

var app = express()

//Databse models
var { Controller } = require('./data/sequelize')

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser())

app.use(session)
app.use(passport.initialize())
app.use(passport.session())


logger.logImportant('###################\n####APP STARTED####\n###################')

app.use('/', indexRouter)
app.use('/students', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error pageć
	res.status(err.status || 500)
	res.send(err)
});

module.exports = app
