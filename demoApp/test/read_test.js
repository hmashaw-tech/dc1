/**
 * 
 */

const assert = require('assert')

const Ninja = require('../src/ninja')

describe('Reading records', () => {
    let newNinja

    beforeEach((done) => {
        newNinja = new Ninja({ name: 'Tony' })
        newNinja.save()
            .then(() => done())
    })

    it('finds all ninjas with a given name', (done) => {
        Ninja.find({ name: 'Tony' })
            .then((ninjas) => {
                assert(ninjas[0]._id.toString() === newNinja._id.toString())
                done()
            })
    })

    it('finds a ninja with a given id', (done) => {
        Ninja.findOne({ _id: newNinja._id })
            .then((ninja) => {
                assert(ninja.name === 'Tony')
                done()
            })
    })
    
})

