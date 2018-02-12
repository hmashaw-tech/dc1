/**
 * 
 */

const mongoose = require('mongoose')

// Fixed in Mongoose, no longer needed
//mongoose.Promise = global.Promise

/*
All Mochas functions get called with a done callback
Call done when Mocha should run next test - Mocha will complete current action
Done is optional, but once you add it, you have to call it
*/
before((done) => {
    mongoose.connect('mongodb://mongodb-server/ninjas_test')
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Warning', error)
        })
})

beforeEach((done) => {
    mongoose.connection.collections.ninjas.drop()
        .then(() => done())
        .catch(() => done())
})

