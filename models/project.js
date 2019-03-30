
// The Project model 
const mongoose = require ('mongoose');


const projectSchema = new mongoose.Schema({

    task_id:{type:String,required:true},
    partner_id:{type:String,required:true},
    member_id:{type:String,required:true},
    link:{type:String,required:true}
})
const ProjectModel=mongoose.model('project',projectSchema);
module.exports=ProjectModel;