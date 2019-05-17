// requirements: require db/connection as 'mongoose'
const mongoose = require('../db/connection')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

// create schema:
const Dog = new Schema({
    name: String,
    breed: String,
    shelterId: ObjectId
})
// export model with module.exports
module.exports = mongoose.model('Dog', Dog)