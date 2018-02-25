/**
 * 
 */

const assert = require('assert')
const request = require('supertest')

const app = require('../app')

describe('The Ninja Express App', () => {
    it('handles a GET request to /api', (done) => {
        request(app)
            .get('/api')
            .end((err, res) => {
                assert(res.body.msg.indexOf('Hello Ninjas!') !== -1)
                done()
            })
    })

    it('handles a GET request to /api/osInfo', (done) => {
        request(app)
            .get('/api/osInfo')
            .end((err, res) => {
                assert(res.body.msg.indexOf('Hostname:') !== -1)
                done()
            })
    })
})

