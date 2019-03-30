const mongoose = require ('mongoose');
/* // DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err)) */

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
