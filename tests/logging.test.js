const chai = require('chai')
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
const rewire = require("rewire")

const logging = rewire("../utils/logging")

const consoleMock = {
    group: console.group,
    groupEnd: console.groupEnd,
    log: sinon.spy(),
}

chai.use(sinonChai)

const { assert } = chai

describe('logging utility functions', () => {
    describe('formatLogEntry takes an array of two objects as an argument and ', () => {
        it('iterates over each object and creates a log object based on their property similarities ', () => {
            const dupe = {
                name: 'foo',
                email: 'bar@baz',
                qux: 'faz'
            }
            const rem = {
                name: 'foo',
                email: 'bar@baz',
                qux: 'faz'
            }
            const logObj = logging.formatLogEntry([dupe, rem])
            
            assert.hasAllKeys(logObj, ['name', 'email', 'qux'])
        })
        it('writes logObj properties that are strictly equal with the same value given', () => {
            const dupe = {
                name: 'foo'
            }
            const rem = {
                name: 'foo'
            }
            const logObj = logging.formatLogEntry([dupe, rem])
            assert.strictEqual(dupe.name, rem.name)
            assert.strictEqual(dupe.name, logObj.name)
            assert.strictEqual(rem.name, logObj.name)
        })
        it('writes logObj properties that are not strictly equal with a new value formatted to show the change between the two items', () => {
            const dupe = {
                name: 'foo'
            }
            const rem = {
                name: 'bar'
            }
            const logObj = logging.formatLogEntry([dupe, rem])
            assert.notStrictEqual(dupe.name, rem.name)
            assert.include(logObj.name, rem.name)
        })
    })
    describe('consoleChange ', () => {
        it('logs out the changed item to the console ', () => {
            const revert = logging.__set__('console', consoleMock)

            logging.consoleChange({ some: 'random object' })
            sinon.assert.calledTwice(console.log)
            
            revert()

        })
    })
})