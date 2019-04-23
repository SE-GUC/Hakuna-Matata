const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SkillSchema = new Schema({
    name: {
        type: String,
        //required: true
    }
},{ _id : false })
const TrainingProgramInfoSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
       // required: true,
    },
    name: {
        type: String,
        //required: true
    },
    date:{
        type:Date
    }

},{ _id : false });
educationalOrganization:TrainingProgramInfoSchema
// Create the schema
const TrainingProgramSchema = new Schema({
    name: {
        type: String
    },
    trainer: {
        type: TrainingProgramInfoSchema
    },
    description: {   
        type: String
    },
    type: {
        type: String
    },
    duration: {
        type: String
    },
    applyDueDate: {
        type: Date
    },
    startDate: {
        type:Date
    },
    requiredSkills: {
        type: [SkillSchema]
    },
    educationalOrganization:TrainingProgramInfoSchema

})

const TrainingProgram = mongoose.model('trainingPrograms', TrainingProgramSchema)
module.exports = TrainingProgram