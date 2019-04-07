const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ConsultancyAgencySchema = new Schema({
    name: {
        type: String
    },
    rate: {
        type: Number
    },
    information: {
        type: String
    },
    partners: {
        type: [String]
    },
    members: {
        type: [String]
    },
    reports: {
        type: [String]
    }
});

module.exports = ConsultancyAgency = mongoose.model('consultancyAgencies', ConsultancyAgencySchema)