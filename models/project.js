// The Project model 
const mongoose = require('mongoose');
const Schema = mongoose.Schema


const projectSchema = new Schema({

    taskId: {
        type: String,
        required: true
    },
    partnerId: {
        type: String,
        required: true
    },
    memberId: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})
module.exports = Project = mongoose.model('projects', projectSchema)