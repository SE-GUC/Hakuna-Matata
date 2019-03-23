const mongoose = require('mongoose')

// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))
const Schema = mongoose.Schema
const CourseSchema=new Schema({
    name:{
        type:String,
        required: true
    },
  
    educator_name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    places:{
        type:Number,
        required:true
    },
    available_places:{
        type:Number,
        required:true
    },
    payment:{
        type:Number,
        required:true
    },
    course_duration:{
        type:Number,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        
    },
    categories:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    },
    //add reference to members when created
    listofapplies:{
        type:[],
        
    },
    acceptedmembers:{
        type:[],
    }


})






courses = mongoose.model('courses', CourseSchema)


module.exports=courses