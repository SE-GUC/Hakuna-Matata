const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TaskInfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    }

},{ _id : false });
// Skill Schema
const SkillSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{ _id : false });
const ChangedTaskFieldSchema = new Schema({
  //Field is allowed to change in task 
})
// Create the schema
const TaskSchema = new Schema({
    tag:{
        type:String,
        required:true,
        enum:['Task','Project']
    },
    name:{
        type:String,
        required:true
    },
    taskPartner: TaskInfoSchema,
    project:TaskInfoSchema,
    taskMember: TaskInfoSchema,
    adminId:mongoose.Schema.Types.ObjectId,
    taskConsultancyAgency: TaskInfoSchema,
    appliedConsultancyAgencies: [TaskInfoSchema],
    appliedMembers: [TaskInfoSchema],
    description: {
        type: String,
        required: false
    },
    // why array ?
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
    // consultyNeeded: {
    //     type: Boolean,
    //     required: false
    // },
    consultancyChanges: ChangedTaskFieldSchema,
    isChanged:  {
        type: Boolean,
        required: false
    },
    consultyNeeded:{
        type: Boolean,
        required: false
    },
    changeIsAccpted:  {
        type: Boolean,
        required: false
    },
})

const Task = mongoose.model('tasks', TaskSchema)
module.exports = Task