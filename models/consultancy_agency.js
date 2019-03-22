const mongoose = require('mongoose')
const Schema = mongoose.Schema
const consultancy_agency_schema = new Schema({
    name:{type:String},
    rate:{type:Number},
    information:{type:String},
    parteners:{type:[String]},
    members:{type:[String]},
    reports:{type:[String]}
});


module.exports = router = mongoose.model('consulties', consultancy_agency_schema)