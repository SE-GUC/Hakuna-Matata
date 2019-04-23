const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Displayed info better than repeate it agine in each array

// reservation Schema
const ReservationSchema = new Schema({
  
    slot:{
        type:String,
    },
    reservationDate:{
        type:String,
       
    },
    reserverID:mongoose.Schema.Types.ObjectId,
    reserverName:String,

    isAccpted:{
        type:Boolean,
        default:false
    
    },
},{ _id : true })
//Room for coworkingSpace
const RoomSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    capacity: {
        type: Number,
        required: true
    },
    slots: {
        type: [String]
    },
    reviews: [{
        reviewer: mongoose.Schema.Types.ObjectId,
        comment: String
    }],
    reservations:[ReservationSchema],
    coworkingSpaceID:mongoose.Schema.Types.ObjectId,
    coworkingSpaceName:String,
    

});
const Room = mongoose.model('rooms', RoomSchema)
module.exports = Room