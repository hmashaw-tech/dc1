/**
 * 
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NinjaSchema = new Schema({
    name: String
})

/*
Set's up ninja collection in DB and use NinjaSchema
Ninja class = entire DB collection of ninjas
*/
const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja

