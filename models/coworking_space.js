const room = require('./room');

const mongoose = require('mongoose')
/* // DB Config
const db = require('../config/keys').mongoURI



mongoose.connect(db,{ useNewUrlParser: true })
.then(()=>console.log('connected to mongo'))
.catch(err => console.error('coudnt connect to mongo',err))
 */
const Schema = mongoose.Schema

// Create the schema
const coworkingSpaceSchema = new Schema({
    partner_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    
    phone_number: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    business_plans: {
        type: String, 
        required: true
    },facilites: {
        type: String, 
        required: true
    },
    max_no_rooms: {
        type: Number,
        required: true
    },
    rooms:{
        type: Array,
        required: true
    },
    
})

module.exports = coworking_space = mongoose.model('coworking_space', coworkingSpaceSchema)