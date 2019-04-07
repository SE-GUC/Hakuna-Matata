const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const RoomSchema = new Schema({
    reservedId : {
        type: String,
        required: false
    },
    reservedDate : {
        type: Date,
        required: false
    },
    capacity : {
        type: Number,
        required: true
    },
    endOfReservation : {
        type: Date,
        required: false
    },
    reserved: {
        type: Boolean,
        required: false,
        default: false
    }
})
module.exports = Room = mongoose.model('rooms', RoomSchema)