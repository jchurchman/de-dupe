const textFormat = require('./textFormat')


module.exports = {
    formatLogEntry: ([ dupe, rem ]) => {
        const logObj = {}
        for (let key in dupe) {
            const oldProp = dupe[key]
            const newProp = rem[key]
            logObj[key] = oldProp === newProp
                ? newProp
                : `${textFormat.strikeThrough(oldProp)} -> ${newProp}`
        }
        return logObj
    },
    consoleChange: changedItem => {
        console.group()
        console.log('Duplicate entry found:')
        console.log(changedItem)
        console.groupEnd()
    }
}