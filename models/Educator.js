const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const EducatorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: Number
    },
    certifactes: {
        type: Array
    },
    contact: {
        type: String,
        required: true
    }
})

module.exports = Educator = mongoose.model('educators', EducatorSchema)