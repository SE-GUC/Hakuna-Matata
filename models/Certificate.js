const mongoose = require('mongoose');
const Schema = mongoose.Schema
const CertificateInfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
       // required: true,
    },
    name: {
        type: String,
        //required: true
    },
    date:{
        type:Date
    }

},{ _id : false });
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
    },
    educationalOrganization:CertificateInfoSchema

})

const Certificate= mongoose.model('certificates', CertificateSchema)
module.exports = Certificate 