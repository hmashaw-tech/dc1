/**
 * 
 */

const assert = require('assert')

const Ninja = require('../src/ninja')

describe('Updating records', () => {
    let newNinja

    /*
    Check delete_test.js - See all the duplicated code?
    Let's try an alternative - helper function
    */
    function assertName(operation, done) {
        operation
        .then(() => Ninja.find({}))
        .then((ninjas) => {
            assert(ninjas.length === 1)
            assert(ninjas[0].name === 'newTony')
            done()
        })
    }

    beforeEach((done) => {
        newNinja = new Ninja({ name: 'Tony' })
        newNinja.save()
            .then(() => done())
    })

    it('instance using set & save', (done) => {
        newNinja.set('name', 'newTony')
        assertName(newNinja.save(), done)
    })

    it('model instance can update', (done) => {
        assertName(Ninja.update( { name: 'newTony' }), done)
    })

    it('model class can update', (done) => {
        assertName(Ninja.update({ name: 'Tony' }, { name: 'newTony' }), done)
    })

    it('model class can update one record', (done) => {
        assertName(Ninja.findOneAndUpdate({ name: 'Tony' }, { name: 'newTony' }), done)
    })

    it('model class can find and update given an ID', (done) => {
        assertName(Ninja.findByIdAndUpdate({ _id: newNinja._id }, { name: 'newTony' }), done)
    })
    
})

