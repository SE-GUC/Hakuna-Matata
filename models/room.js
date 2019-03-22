const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const roomSchema = new Schema({
 reserved_id : {
        type: String,
        required: false
},
reserved_date : {
    type: Date,
    required: false
},
capacity : {
    type: Number,
    required: true
},

end_of_reservation : {
    type: Date,
    required: false
},

reserved : {
    type: Boolean,
    required: false
}
})
module.exports = Room = mongoose.model('rooms', roomSchema)