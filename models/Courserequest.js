
// The Courserequest model
const mongoose = require('mongoose');
// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const RecomendationsSchema = new mongoose.Schema({
    course_id:String,rating:{type:Number,enum:[1,2,3,4,5]} ,numberofratings:Number
})
//Schema
const CourserequestSchema= new mongoose.Schema ({

    description:String,
    dateofsubmission:{type:Date,default:Date.now},
    applyingmember_id:String,
    categories:String,
    recomendations:[{type:RecomendationsSchema}],
    active:{type:Boolean,default:true}
})

const Courserequest=mongoose.model('Courserequest',CourserequestSchema)
module.exports = Courserequest



