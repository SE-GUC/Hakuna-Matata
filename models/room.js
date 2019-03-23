const mongoose = require('mongoose')
const Schema = mongoose.Schema
// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

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