const mongoose = require('mongoose')
const Schema = mongoose.Schema

// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))


// Create the schema
const training_programs_Schema = new Schema({
    name: {
        type: String,
    },
    trainer_id:{
        type:Number,
    },
  
    trainer_name:{
        type:String
    },
    description:{   
        type:String
    },
    type: {
        type: String,
    },
    duration:{
        type:String
    },
    apply_due_date:{
        type:Date
    },
    start_date:{
        type:Date
    },
    required_skills:{
        type:[String]
    }


})

module.exports = certificates = mongoose.model('training_programs', training_programs_Schema)