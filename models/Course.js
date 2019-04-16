const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CourseInfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
       // required: true,
    },
    name: {
        type: String,
        //required: true
    },
    date:{
        type: Date,
        //required: true
    }

},{ _id : false });
// Create the schema
const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    educatorName: CourseInfoSchema,
    description: {
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
    payment: {
        type: Number,
        required: true
    },
    courseDuration: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required:true
    },
    category: {
        type: String,
        required: true
    },   
// what is the mean of that
    // categories: {
    //     type: String,
    //     required: true
    // },
    isAvailable: {
        type: Boolean,
        required: true
    },
    // add reference to members when created
    listOfApplied: {
        type: [CourseInfoSchema]
    },
    listOfAccepted: { 
        type: [CourseInfoSchema]
    },
    educationalOrganization:CourseInfoSchema

})

const Course= mongoose.model('courses', CourseSchema)
module.exports.Course = Course 