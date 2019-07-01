const { assert } = require('chai')
const textFormat = require('../utils/textFormat')

describe('textFormat ', () => {
    describe(' parseFilePathToName ', () => {
        it(' splits a path argument and returns just the filename ', () => {
            const fileOne = '../../src/lib/utils.js'
            assert.strictEqual(textFormat.parseFilePathToName(fileOne), 'utils')
        })
        it(' can handle a filename with a period in it ', () => {
            const fileOne = '../../src/lib/utils.foo.js'
            assert.strictEqual(textFormat.parseFilePathToName(fileOne), 'utils.foo')
        })
    })

    describe(' strikeThrough ', () => {
        it('doubles the length of a string ', () => {
            const string = 'foo'
            assert.strictEqual(textFormat.strikeThrough(string).length, string.length * 2)
        })
        it('appends a unicode strike character (u0336) after each letter ', () => {
            const string = 'quuux'
            const formattedString = textFormat.strikeThrough(string)
            const allTheStrikes = formattedString.split('').filter(char => char !== '\u0336')
            assert.strictEqual(string.length, allTheStrikes.length)
        })
    })
})