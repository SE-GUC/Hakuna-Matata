// The Member model 
const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/newmongo',{ useNewUrlParser: true })
.then(()=>console.log('connected to mongo'))
.catch(err => console.error('coudnt connect to mongo',err))

const memberSchema = new mongoose.Schema({

    fullname:{type:String ,required:true},
    webname:{type:String ,required:true},
    datejoined:{type:Date ,default:Date.now},
    deactivated:{type:Boolean,default:false},
    completed_task_id:[mongoose.Schema.Types.ObjectId],
    applied_task_id:[mongoose.Schema.Types.ObjectId],
    levelofexpreience:{type:Number,enum:[1,2,3,4,5]},
    Rating:{type:Number,enum:[1,2,3,4,5]},
    all_rated_reco:Number,
    avreage_reco_rate:{type:Number,enum:[1,2,3,4,5]},
    allratedtasks:Number,
    skills:[{type:String}]
})
const Member=mongoose.model('Member',memberSchema);
module.exports.Member=Member;

function getexplevel(id) {
    return Member
        .findOne({_id: id})
        .then(function(member) {
            return member.levelofexpreience;
        })
        .catch(function(err) {
            console.log(err);
        });
}
module.exports.getexplevel=getexplevel;




