// The Project model 
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const InfoSchema = new Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
    }

},{ _id : false });
const plateformSchema = new Schema({
    tags: {
        type: [String],
        enum: ['Partner', 'Member', 'ConsultancyAgency', 'CoworkingSpace', 'EducationOrganization'],
        required: true
    },
    type: {
        type: String,
        enum: ['Task', 'Report', 'Project', 'Event', 'Course', 'CourseRequest', 'Post'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    owener:{
        type:InfoSchema,
        required: true
    }
})
const Plateform = mongoose.model('skills', plateformSchema)
module.exports = Plateform