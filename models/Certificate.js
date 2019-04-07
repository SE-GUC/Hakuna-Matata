const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create the schema
const CertificateSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
    },
    accreditation: {
        type: String
    }
})

module.exports = Certificate = mongoose.model('certificates', CertificateSchema)