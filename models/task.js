const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Create the schema
const taskSchema = new Schema({
partner_id : {
    type: String,
    required: false
},
consultancy_agency_id : {
    type: String,
    required: false
},
member_id : {
    type: String,
    required: false
},
admin_id : {
    type: String,
    required: false
},
applied_id : {
    type: [String],
    required: false
},
description : {
    type: String,
    required: false
},
// why array ?
required_skills : {
    type: [String],
    required: false
},
monetary_compensation : {
    type: Number,
    required: false
},
deadline : {
    type: Date,
    required: false
},
deadline_for_apply : {
    type: Date,
    required: false
},
upload_date : {
    type: Date,
    required: false
},
submission_date : {
    type: Date,
    required: false
},
experience_level : {
    type: Number,
    required: false
},
commit_level : {
    type: Number,
    required: false
},
work_cycle : {
    type: String,
    required: false
},
link_of_task : {
    type: String,
    required: false
},
user_rate : {
    type: Number,
    required: false
},
accepted : {
    type: Boolean,
    required: false
},
rate : {
    type: Number,
    required: false
},
consulty_needed : {
    type: Boolean,
    required: false
},
cunsulties_done : {
    type: Array,
    required: false
}
})
module.exports = Task = mongoose.model('tasks', taskSchema)