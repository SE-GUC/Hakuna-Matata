<<<<<<< HEAD
    
=======

>>>>>>> master
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const InfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    }

<<<<<<< HEAD
}, { _id: false });
=======
},{ _id : false });
>>>>>>> master
const RecomendationsSchema = new Schema({
    expert: {
        type: InfoSchema
    },
    masterClass: {
        type: InfoSchema
    },
<<<<<<< HEAD
    content: String,

})
=======
    content: String, 
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    numberOfRatings: {
        type: Number
    },
    reviewer:[mongoose.Schema.Types.ObjectId]
},{ _id : false })
>>>>>>> master

// Create the schema
const CourseRequestSchema = new Schema({
    description: {
        type: String,

    },
    dateOfSubmission: {
        type: Date,
        default: Date.now
    },
<<<<<<< HEAD
    applyingMemberId: {
        type: mongoose.Schema.Types.ObjectId
    },
    category: {
        type: String
    },
    recomendations: {
=======
    applyingMemberId: { 
        type:mongoose.Schema.Types.ObjectId
    },
    category: { 
        type:String
    },
    recomendations: { 
>>>>>>> master
        type: [RecomendationsSchema]
    },
    active: {
        type: Boolean,
        default: true
    },
    ratings: [{
        reviewer:
        {
        id:mongoose.Schema.Types.ObjectId,
        name:String
    },
        rate:Number
    }],
})
const CourseRequest = mongoose.model('courseRequests', CourseRequestSchema)

module.exports = CourseRequest




