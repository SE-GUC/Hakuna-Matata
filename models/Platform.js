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
const PlatformSchema = new Schema({
    tags: {
        type: [String],
        enum: ['Partner', 'Member', 'ConsultancyAgency', 'CoworkingSpace', 'EducationOrganization'],
        required: true
    },
    type: {
        type: String,
        enum: ['Task', 'Report', 'Project', 'Event', 'CourseRequest', 'Post'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    owner:{
        type:InfoSchema,
        required: true
    },
    data:{
        type:InfoSchema,
        required: false
    },
    description:String
})
const Platform = mongoose.model('platforms', PlatformSchema)
module.exports = Platform