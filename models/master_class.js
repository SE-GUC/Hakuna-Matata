const mongoose = require('mongoose')

// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const Schema = mongoose.Schema

// Create the schema
const master_class_Schema = new Schema({
    
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

    available_places: {
        type: Number,
        required: true
    },

    courses: {
        type: Array
       
    },
    course_duration: {
        type: String,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    level_of_students: {
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


})

module.exports = master_class = mongoose.model('master_class', master_class_Schema)