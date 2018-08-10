var colors = require('colors');
var colors = require('colors/safe');

module.exports = {
    logError: message => {
        console.log(`---${message}---`.red.inverse)
    },
    logTest: message => {
        console.log(`___${message}___`.blue.inverse)
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