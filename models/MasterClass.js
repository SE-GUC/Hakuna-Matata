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
<<<<<<< HEAD
    },
    date:{
        type:Date
=======
>>>>>>> master
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
        required: false
    },
    courses: {
        type: [MasterClassInfoSchema] 
    },
    MasterClassDuration: {
        type: String,
        required: false
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
        // what is the use of that 

    levelOfStudents: {
        type: String,
        required: false
    },
    // what is the use of that 
    effort: {
        type: String,
        required: false
    },
    isAvailable: {
        type: Boolean,
        required: false
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