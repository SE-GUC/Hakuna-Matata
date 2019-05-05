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
<<<<<<< HEAD
    educator: CourseInfoSchema,
=======
    educatorName: CourseInfoSchema,
>>>>>>> master
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
        required: false
    },
    payment: {
        type: Number,
        required: true
    },
    courseDuration: {
        type: String,
<<<<<<< HEAD
        required: false
=======
        required: true
>>>>>>> master
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
        required: false
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
<<<<<<< HEAD
module.exports = Course 
=======
module.exports.Course = Course 
>>>>>>> master
