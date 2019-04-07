const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const TaskSchema = new Schema({
    partnerId: {
        type: String,
        required: false
    },
    consultancyAgencyId: {
        type: String,
        required: false,
        default: ""
    },
    memberId: {
        type: String,
        required: false
    },
    adminId: {
        type: String,
        required: false
    },
    appliedId: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: false
    },
    // why array ?
    requiredSkills: {
        type: [String],
        required: false
    },
    monetaryCompensation: {
        type: Number,
        required: false
    },
    deadline: {
        type: Date,
        required: false
    },
    deadlineForApply: {
        type: Date,
        required: false
    },
    uploadDate: {
        type: Date,
        required: false
    },
    submissionDate: {
        type: Date,
        required: false
    },
    experienceLevel: {
        type: Number,
        required: false
    },
    commitLevel: {
        type: Number,
        required: false
    },
    workCycle: {
        type: String,
        required: false
    },
    linkOfTask: {
        type: String,
        required: false
    },
    userRate: {
        type: Number,
        required: false
    },
    accepted: {
        type: Boolean,
        required: false
    },
    rate: {
        type: Number,
        required: false
    },
    consultyNeeded: {
        type: Boolean,
        required: false
    },
    consultanciesDone: {
        type: Array,
        required: false
    }
})

module.exports = Task = mongoose.model('tasks', TaskSchema)