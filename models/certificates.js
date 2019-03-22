const mongoose = require('mongoose');
const Schema = mongoose.Schema


// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Create the schema
const certificates_Schema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    accreditation: {
        type: String,
    }


})

module.exports = certificates = mongoose.model('certificates', certificates_Schema)