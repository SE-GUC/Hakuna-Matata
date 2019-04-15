// The Project model 
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PorjectInfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
    },
    name: {
        type: String,
        //required: true
    }

},{ _id : false });
// Skill Schema
const SkillSchema = new Schema({
    name: {
        type: String,
       // required: true
    }
},{ _id : false });
const ChangedProjectFieldSchema = new Schema({
    //Field is allowed to change in project 
})
const ProjectSchema = new Schema({
    name:String,
    projectPartner: PorjectInfoSchema,
    projectConsultancyAgency: PorjectInfoSchema,
    projectMember: PorjectInfoSchema,
    consultancyAgency: PorjectInfoSchema,
    adminId:mongoose.Schema.Types.ObjectId,
    description: {
        type: String,
        required: false
    },

    requiredSkills: [SkillSchema],
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
        type: Number,
        required: false
    },
    linkOfProject: {
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
    appliedConsultancies: [PorjectInfoSchema],
    isAtomic: {
        type: Boolean,
        required: false
    },
    tasks: [PorjectInfoSchema],
    consultancyAgencyProject: ChangedProjectFieldSchema,
    //Some info about consultancies that will be in the project
    projectManager: String,

})
const Project = mongoose.model('projects', ProjectSchema)
module.exports = Project