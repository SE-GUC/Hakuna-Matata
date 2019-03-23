
const mongoose=require('mongoose')
const Schema = mongoose.Schema
// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const organizationschema=new Schema({
   //update partner id to reference partner
    partner_id:{
      type:Number,
      required:true
    },
    name:{
        type:String,
        required:true
    },
    certificates:{
        type:Array,

    },
    training_programs:{
        type:Array
    },
    courses:{
        
        type:Array
       
    },
    master_class:{
        type:Array
    },
    educators:{
        type:Array
    }
})




organization = mongoose.model('educational_organizations', organizationschema)


module.exports=organization