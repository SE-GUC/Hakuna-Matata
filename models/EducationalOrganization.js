const mongoose=require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const EducationalOrganizationSchema=new Schema({
   // update partner id to reference partner
    partnerId: {
      type: Number,
      required: true
    },
    name: {
        type: String,
        required: true
    },
    certificates: {
        type: Array
    },
    trainingPrograms: {
        type: Array
    },
    courses: {
        type: Array
    },
    masterClass: {
        type: Array
    },
    educators: {
        type: Array
    }
})

module.exports = EducationalOrganization = mongoose.model('educationalOrganizations', EducationalOrganizationSchema)
