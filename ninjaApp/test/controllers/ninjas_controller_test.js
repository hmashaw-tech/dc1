/**
 * 
 */

const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../../app')

/**
 * Interesting - Not pulling in model via require ../../../models/ninja.
 * Mongoose also gives access as shown below and this resolves issues
 * with Express + Mocha + Mongoose (File gets required multiple times).
 * See 'require' comment in ninjas_contoller.js
 */
const Ninja = mongoose.model('ninja')


describe('Ninjas Controller', () => {
    it('handles a GET request to /api/ninjas - Return Ninjas in a location', (done) => {
        const seattleNinja = new Ninja({ 
            email: 'seattle@test.com',
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        })

        const miamiNinja = new Ninja({ 
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.254, 25.791] }
        })

        Promise.all([ seattleNinja.save(), miamiNinja.save() ]).then(() => {
            request(app)
                .get('/api/ninjas?lng=-80&lat=25')
                .end((err, res) => {
                    //console.log(res)
                    assert(res.body.length === 1)
                    assert(res.body[0].email === 'miami@test.com')
                    done()
                })
        })
    })


    it('handles a POST request to /api/ninjas - Creates a new Ninja', (done) => {

        Ninja.count().then(count => {
            request(app)
                .post('/api/ninjas')
                .send({ email: 'test@test.com' })
                .end(() => {
                    Ninja.count().then(newCount => {
                        assert(count + 1 === newCount)
                        done()
                    })
                })
        })

    })


    it('handles a PUT request to /api/ninjas/:id - Updates an existing Ninja', (done) => {
        const ninja = new Ninja({ email: 'driver@test.com', available: false })

        ninja.save().then(() => {
            request(app)
                .put(`/api/ninjas/${ninja._id}`)
                .send({ available: true})
                .end(() => {
                    Ninja.findOne({ email: 'driver@test.com' })
                        .then(ninja => {
                            assert(ninja.available === true)
                            done()
                        })
                })
        })
    })


    it('handles a DELETE request to /api/ninjas/:id - Delete an existing Ninja', (done) => {
        const ninja = new Ninja({ email: 'driver@test.com', available: false })

        ninja.save().then(() => {
            request(app)
                .delete(`/api/ninjas/${ninja._id}`)
                .end(() => {
                    Ninja.findOne({ email: 'driver@test.com' })
                        .then(ninja => {
                            assert(ninja === null)
                            done()
                        })
                })
        })
    })
})

