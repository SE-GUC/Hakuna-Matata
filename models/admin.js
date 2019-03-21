const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
})

module.exports = Admin= mongoose.model('admins', AdminSchema)