const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartnerSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    information: {
        type: String
    },
    partners: [{
        type: String
    }],
    fieldOfWork: String,
    projects: [{
        type: String
    }],
    feedbackForm: String

})
module.exports = Partner = mongoose.model('partners', PartnerSchema);

