const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MasterClassInfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
       // required: true,
    },
    name: {
        type: String,
        //required: true
    }

},{ _id : false });

// Create the schema
const MasterClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    places: {
        type: Number,
        required: true
    },
    availablePlaces: {
        type: Number,
        required: true
    },
    courses: {
        type: [MasterClassInfoSchema] 
    },
    MasterClassDuration: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    levelOfStudents: {
        type: String,
        required: true
    },
    // what is the use of that 
    effort: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    listOfApplied:{
        type: [MasterClassInfoSchema]
    },
    listOfAccepted:{
        type: [MasterClassInfoSchema]
    },
    educationalOrganization:MasterClassInfoSchema
})

const MasterClass = mongoose.model('masterClasses', MasterClassSchema)
module.exports = MasterClass