/**
 * 
 */

const assert = require('assert')

const Ninja = require('../src/ninja')

/*
Mongoose has an isNew flag indicating if doc has been saved to DB
Also, on create(new) Mongoose will autoassign an id (unique & prior to DB save)
*/
describe('Creating records', () => {
    it('saves a ninja', (done) => {
        const newNinja = new Ninja({ name: 'Tony' })
        newNinja.save()
            .then(() => {
                assert(!newNinja.isNew)
                done()
            })
    })
})

