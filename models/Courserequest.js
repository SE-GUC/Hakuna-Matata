
// The Courserequest model
const mongoose = require('mongoose');
/* // DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err)) */


const CourserequestSchema= new mongoose.Schema ({

    description:String,
    dateofsubmission:{type:Date,default:Date.now},
    applyingmember_id:String,
    categories:String,
    recomendations:[],
    active:{type:Boolean,default:true}
})

const Courserequest=mongoose.model('Courserequest',CourserequestSchema)
module.exports = Courserequest




