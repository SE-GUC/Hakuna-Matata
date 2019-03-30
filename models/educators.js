const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* // DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
 */
// Create the schema
const educatorsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    
    experience_level: {
        type: Number,
    },

    certifactes: {
        type: Array

    },
    contact: {
        type: String,
        required: true

    }
})

module.exports = educators = mongoose.model('educators', educatorsSchema)