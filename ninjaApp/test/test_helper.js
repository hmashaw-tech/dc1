/**
 * 
 */

const mongoose = require('mongoose')

// Don't run any tests until mongo successfully connected
before(done => {
    mongoose.connect('mongodb://mongodb-server/ninjas_test')
    
    mongoose.connection
        .once('open', () => { done() } )
        .on('error', (error) => console.warn('Warning', error))
})


beforeEach(done => {
    // Interesting ES6 construct
    const { ninjas } = mongoose.connection.collections

    // The first time the test is run, there is no collection to drop
    if (!ninjas) {
        done()
    } else {
        ninjas.drop()
            // Index will be dropped so needs to be recreated
            .then(() => { ninjas.createIndex({ 'geometry.coordinates': '2dsphere' }) })
            .then(() => done())
            .catch(() => done())
            
            // Ready to run the next text
    }
})
