const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create the schema
const CourseRequestSchema = new Schema({
    description: { 
        type:String
    },
    dateOfSubmission: {
        type: Date,
        default: Date.now
    },
    applyingMemberId: { 
        type:String
    },
    categories: { 
        type:String
    },
    recomendations: { 
        type: []
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = CourseRequest = mongoose.model('courseRequests',CourseRequestSchema)
 




