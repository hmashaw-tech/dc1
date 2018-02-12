/**
 * 
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PointSchema = new Schema ({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
})

const NinjaSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
})

const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja

