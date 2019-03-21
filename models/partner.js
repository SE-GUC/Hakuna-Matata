const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/newmongo',{ useNewUrlParser: true })
.then(()=>console.log('connected to mongo'))
.catch(err => console.error('coudnt connect to mongo',err))

const partnerSchema = new mongoose.Schema({

    name:{type:String ,required:true},
    information:{type:String },
    partners:[{type:String}],
    field_of_work:String,
    projects:[{type:String}],
    feedback_form:String

})
const Partner=mongoose.model('Partner',partnerSchema);

module.exports=Partner;
