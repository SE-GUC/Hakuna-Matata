const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Create the schema
const CoWorkingSpaceSchema = new Schema({
    partnerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    businessPlans: {
        type: String, 
        required: true
    },
    facilites: {
        type: String, 
        required: true
    },
    maxNoRooms: {
        type: Number,
        required: true
    },
    rooms: {
        type: [],
        required: true
    }
})

module.exports = CoWorkingSpace = mongoose.model('coWorkingSpaces', CoWorkingSpaceSchema)