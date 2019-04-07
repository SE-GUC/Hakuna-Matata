const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create the schema
const RecomendationsSchema = new Schema({
    expertId: {
        type: String
    },
    courseId: {
        type: String
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    numberOfRatings: {
        type: Number
    }
})
module.exports = Recomendation = mongoose.model('recomendations', RecomendationsSchema)