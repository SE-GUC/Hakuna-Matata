const mongoose = require('mongoose')
const Schema = mongoose.Schema
// DB Config
const db = require('../config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

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