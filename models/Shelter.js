// requirements: require db/connection as 'mongoose'
const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

// create schema:
const Shelter = new Schema({
    name: String,
    address: String,
    phoneNum: Number
})

// export model with module.exports
module.exports = mongoose.model('Shelter', Shelter)