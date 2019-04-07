const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const MasterClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    places: {
        type: Number,
        required: true
    },
    availablePlaces: {
        type: Number,
        required: true
    },
    courses: {
        type: Array 
    },
    courseDuration: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    levelOfStudents: {
        type: String,
        required: true
    },
    effort: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    studentsAssigened:{
        type: []
    }
})

module.exports = MasterClass = mongoose.model('masterClasses', MasterClassSchema)