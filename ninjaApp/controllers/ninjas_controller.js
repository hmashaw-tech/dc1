/**
 * 
 */

 /**
  * ninja model was not previously being 'required' anywhere . That reslted in a
  * MissingSchemaError: Schema hasn't been registered for model "ninja"
  * when running ninjas_controller_test.  Require here to resolve
  */

const os = require('os')
 
const Ninja = require('../models/ninja')

module.exports = {

    // Legacy Format - greeting: function(req,res) {...}

    api(req, res) {
        res.send({ msg: 'Hello Ninjas! ... V1.1' })
    },

    osInfo(req, res) {
        const frame1 = 'Hostname: ' + "'" + os.hostname() + "'" + ', '
        const frame2 = 'Load_Avg: ' + "'" + os.loadavg() + "'" + ', '
        const frame3 = 'Network_Interfaces: ' + JSON.stringify(os.networkInterfaces())
        data = '{' + frame1 + frame2 + frame3 + '}'
        res.send({ msg: data })
    },

    index(req, res, next) {
        const { lng, lat } = req.query

        /*
        Ninja.geoNear(
            { type: 'Point', coordinates: [lng, lat] },
            { spherical: true, maxDistance: 100000 }
        )
            .then(ninjas => res.send(ninjas))
            .catch(next)
        */

        Ninja.aggregate(
            [
                {
                    '$geoNear': {
                        'near': {
                            'type': 'Point',
                            'coordinates': [parseFloat(lng), parseFloat(lat)]
                        },
                        'spherical': true,
                        'distanceField': 'dist',
                        'maxDistance': 100000
                    }
                }
            ]
        )
        .then(ninjas => res.send(ninjas))
        .catch(next)
    },

    create(req, res, next) {
        const ninjaProps = req.body

        Ninja.create(ninjaProps)
            .then(ninja => res.send(ninja))
            .catch(next)
    },

    update(req, res, next) {
        const ninjaId = req.params.id
        const ninjaProps = req.body

        // findByIdAndUpdate - returns stats, not updated record
        Ninja.findByIdAndUpdate({ _id: ninjaId }, ninjaProps)
            .then(() => Ninja.findById({ _id: ninjaId }))
            .then(ninja => res.send(ninja))
            .catch(next)
    },

    delete(req, res, next) {
        const ninjaId = req.params.id

        Ninja.findByIdAndRemove({ _id: ninjaId })
            .then(ninja => res.status(204).send(ninja))
            .catch(next)
    }
}

