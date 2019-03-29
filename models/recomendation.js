//The Courserequest model
const mongoose = require('mongoose');
const Schema = mongoose.Schema
/* // DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err)) */

const RecomendationsSchema = new Schema({
    expert_id:String,
    course_id:String,
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    numberofratings:Number
})
module.exports = Recomendation= mongoose.model('Recomendation', RecomendationsSchema)