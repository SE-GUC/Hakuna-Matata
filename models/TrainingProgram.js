const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const TrainingProgramSchema = new Schema({
    name: {
        type: String
    },
    trainerId: {
        type: Number
    },
    trainerName: {
        type: String
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
        type: [String]
    }
})

module.exports = TrainingProgram = mongoose.model('trainingPrograms', TrainingProgramSchema)