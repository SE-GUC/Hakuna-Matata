
// The Courserequest model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lirtenhub',{useNewUrlParser:true})
.then(()=>console.log('connected to mongo'))
.catch(err=>console.log("there is error",err))
//recomendations Schema
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



