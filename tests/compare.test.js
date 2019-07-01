const { assert } = require('chai');
const compare = require('../utils/compare')

describe('compare utility functions', () => {
    const one = {
        _id: 'foo',
        email: 'bar@baz',
        entryDate: '2014-05-07T17:31:20+00:00'
    }
    const two = {
        _id: 'foo',
        email: 'qux@baz',
        entryDate: '2014-05-07T17:31:20+00:00'
    }
    const three = {
        _id: 'FOO',
        email: 'bar@baz',
        entryDate: '2014-05-08T17:31:20+00:00',
    }
    const four = {
        _id: 'FOO',
        email: 'quuz@baz',
        entryDate: null,
    }
    describe('properties ', () => {
        it('compares strict equality between a config object and an object passed to it  ', () => {
            assert.isTrue(compare.properties({ _id: one._id, email: one.email })(two))
            assert.isTrue(compare.properties({ _id: one._id, email: one.email })(three))
            assert.isFalse(compare.properties({ _id: one._id, email: one.email })(four))
        })
    })
    describe('byEntryDate compares objects by their entryDate properties', () => {
        it('returns an array with the object containing the latest date as the second entry ', () => {
            const [earliest, latest] = compare.byDate(three, one)
            assert.strictEqual(latest, three)
            assert.strictEqual(earliest, one)
        })
        it('returns an array in the same order as the args if the dates match', () => {
            assert.strictEqual(compare.byDate(one, two)[1], two)
        })
        it('returns false if one of the dates is null ', () => {
            assert.isFalse(compare.byDate(one, four))
        })
    })
})