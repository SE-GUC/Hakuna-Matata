
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

}, { _id: false });
const RecomendationsSchema = new Schema({
    expert: {
        type: InfoSchema
    },
    masterClass: {
        type: InfoSchema
    },
    content: String,

})

// Create the schema
const CourseRequestSchema = new Schema({
    description: {
        type: String,

    },
    dateOfSubmission: {
        type: Date,
        default: Date.now
    },
    applyingMemberId: {
        type: mongoose.Schema.Types.ObjectId
    },
    category: {
        type: String
    },
    recomendations: {
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




