var passport = require('passport')
var uuid = require('uuid/v4')
var LocalStrategy = require('passport-local').Strategy
var expressSession = require('express-session')
var FileStore = require('session-file-store')(expressSession)
var logger = require('./logger')
var Controller = require('./data/sequelize')

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        logger.logMessage(`Logging in user ${email} ${password}`)
        let user = await Controller.user.get(email, password).catch(err => {
            logger.logError(err)
        })
        if (user && user.active === false) {
            return done(null, user.get({ plain: true }))
        } else {
            return done('User doesnt exist')
        }

    }
))

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var session = expressSession({
    genid: (req) => {
        logger.logMessage(`Request object sessionID from client: ${req.sessionID}`)
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
})

module.exports = { passport, session }