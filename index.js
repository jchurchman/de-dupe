const fs = require('fs')
const textFormat = require('./utils/textFormat')
const deDupeData = require('./utils/deDupeData')

const pathToData = process.argv[2]

const pojo = JSON.parse(fs.readFileSync(pathToData).toString())

const { changeLog, dedupedCollection } = Object.entries(pojo)
    .reduce(({ changes, coll }, [key, value]) => {
        const { log, collection } = deDupeData(value)

        return {
            changeLog: {
                ...changes,
                [key]: log
            },
            dedupedCollection: {
                ...coll,
                [key]: collection
            }
        }
    }, {})

fs.writeFileSync(
    `${textFormat.parseFilePathToName(pathToData)}.output.json`,
    JSON.stringify(dedupedCollection),
    null,
    4
)

fs.writeFileSync(
    `${textFormat.parseFilePathToName(pathToData)}.log.json`,
    JSON.stringify(changeLog),
    null,
    4
)