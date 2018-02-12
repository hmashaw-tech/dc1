/**
 * 
 */

const NinjasController = require('../controllers/ninjas_controller')

// Take Express 'app' and associate routes
module.exports = (app) => {

    app.get('/api', NinjasController.greeting)

    app.get('/api/ninjas', NinjasController.index)

    app.post('/api/ninjas', NinjasController.create)

    app.put('/api/ninjas/:id', NinjasController.update)

    app.delete('/api/ninjas/:id', NinjasController.delete)
    
}

