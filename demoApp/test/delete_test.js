/**
 * 
 */

const assert = require('assert')

const Ninja = require('../src/ninja')

describe('Deleting records', () => {
    let newNinja

    beforeEach((done) => {
        newNinja = new Ninja({ name: 'Tony' })
        newNinja.save()
            .then(() => done())
    })

    it('model instance remove', (done) => {
        newNinja.remove()
            .then(() => Ninja.findOne({ name: 'Tony' }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })

    it('class method remove', (done) => {
        Ninja.remove({ name: 'Tony' })
        .then(() => Ninja.findOne({ name: 'Tony' }))
        .then((user) => {
            assert(user === null)
            done()
        })
    })

    it('class method findOneAndRemove', (done) => {
        Ninja.findOneAndRemove({ name: 'Tony' })
        .then(() => Ninja.findOne({ name: 'Tony' }))
        .then((user) => {
            assert(user === null)
            done()
        })
     })

     it('class method findByIdAndRemove', (done) => {
        Ninja.findByIdAndRemove({ _id: newNinja._id })
        .then(() => Ninja.findOne({ name: 'Tony' }))
        .then((user) => {
            assert(user === null)
            done()
        })
     })
    
})

