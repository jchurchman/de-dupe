
module.exports = {
    strikeThrough: str => {
        return str.split('')
            .map(char => `${char}\u0336`)
            .join('')
    },
    parseFilePathToName: path => {
        const splitByDir = path.split('/')
        const file = splitByDir[splitByDir.length - 1]
        const splitByExt = file.split('.')
        const name = splitByExt.slice(0, splitByExt.length - 1).join('')
        return name
    }
}