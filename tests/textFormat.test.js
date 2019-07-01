const { assert } = require('chai')
const textFormat = require('../utils/textFormat')

describe('textFormat ', () => {
    describe(' parseFilePathToName ', () => {
        it(' splits a path argument and returns just the filename ', () => {
            const fileOne = '../../src/lib/utils.js'
            assert.strictEqual(textFormat.parseFilePathToName(fileOne), 'utils')
        })
    })
})