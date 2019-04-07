const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const ConsultanceTaskSchema = new Schema({
    partnerId: {
        type: String,
        required: false
    },
    consultancyAgencyId: {
        type: String,
        equired: false
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
        type: [String]
    },
    description: {
        type: String
    },
    requiredSkills: {
        type: [String]
    },
    monetaryCompensation: {
        type: Number
    },
    deadline: {
        type: Date
    },
    deadlineForApply: {
        type: Date
    },
    uploadDate: {
        type: Date
    },
    submissionDate: {
        type: Date
    },
    experienceLevel: {
        type: Number
    },
    commitLevel: {
        type: Number
    },
    workCycle: {
        type: String
    },
    linkOfTask: {
        type: String
    },
    userRate: {
        type: Number
    },
    accepted: {
        type: Boolean
    },
    rate: {
        type: Number
    },
    consultyNeeded: {
        type: Boolean
    },
    consultanciesDone: {
        type: Array
    }
})
// which router will be use in
module.exports = ConsultanceTask = mongoose.model('consultanceTasks', ConsultanceTaskSchema)