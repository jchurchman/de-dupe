const moment = require('moment')

module.exports = {
    properties: (config) => objectTwo => {
        for (let key in config) {
            if (config[key] === objectTwo[key]) return true
        }
        return false
    },
    byDate: (objectOne, objectTwo) => {
        const { entryDate: dateOne } = objectOne
        const oneMoment = moment(dateOne)
        const { entryDate: dateTwo } = objectTwo
        const twoMoment = moment(dateTwo)
        if (oneMoment.isAfter(twoMoment)) return [objectTwo, objectOne]
        if (oneMoment.isSame(twoMoment) || twoMoment.isAfter(oneMoment)) return [objectOne, objectTwo]
        return false
    }
}