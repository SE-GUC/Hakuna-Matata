const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date 
    },
    department: {
        type: String,
        required: true
    },
    salary: {
        type: Number
        },
    id: {
        type: Number,
        required: true
    },
//     email:{
//         type: String,
//         required: true
//     },
//     password:{
//     type: String,
//     required: true
// },

})

const Admin = mongoose.model('admins', AdminSchema)
module.exports = Admin