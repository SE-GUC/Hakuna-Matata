const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    educatorName: {
        type: String,
        required: true
    },
    description: {
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
    payment: {
        type: Number,
        required: true
    },
    courseDuration: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    categories: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    // add reference to members when created
    listOfApplies: {
        type: []
    },
    acceptedMembers: { 
        type: []
    }
})

module.exports = Course = mongoose.model('courses', CourseSchema)