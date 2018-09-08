var colors = require('colors');
var colors = require('colors/safe');

module.exports = {
    logError: message => {
        console.log(colors.red.inverse(`---${message}---`))
    },
    logTest: message => {
        console.log(colors.blue.inverse(`___${message}___`))
    },
    logData: message => {
        console.log(colors.green(message))
    },
    logText: message => {
        console.log(message)
    },
    logImportant: message => {
        console.log(colors.rainbow(message))
    },
    logMessage: message => {
        console.log(colors.yellow(message))
    }
}