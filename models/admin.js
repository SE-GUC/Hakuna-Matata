const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        default: null

    }, 
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
    }
})

const Admin = mongoose.model('admins', AdminSchema)
module.exports = Admin