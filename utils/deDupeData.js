const compare = require('./compare')
const logging = require('./logging')

module.exports = function deDupeData(data) {
    const log = []
    
    const collection = data.reduce(( arr, entry ) => {
        const { _id, email } = entry
        const dupeIdx = arr.findIndex(compare.properties({ _id, email }))
    
        if (dupeIdx > -1) {
            const [ duplicateObj, remainingObj ] = compare.byDate(arr[dupeIdx], entry)
            const itemChangeLog = logging.formatLogEntry([duplicateObj, remainingObj])

            logging.consoleChange(itemChangeLog)
            log.push(itemChangeLog)

            const deDupedEntry = {
                ...duplicateObj,
                ...remainingObj
            }

            return [
                ...arr.slice(0, dupeIdx),
                ...arr.slice(dupeIdx + 1),
                deDupedEntry
            ]
        }

        return [...arr, entry]
    }, [])

    return {
        log,
        collection,
    }
}