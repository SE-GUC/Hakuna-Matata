// The Project model 
const mongoose = require('mongoose');
const Schema = mongoose.Schema


const skillSchema = new Schema({
    name:{
        type: String,
        required:true
    }
})
const Skill = mongoose.model('skills', skillSchema)
module.exports=Skill