const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Displayed info better than repeate it agine in each array
const InfoSchema = new Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
    }

},{ _id : false });
// reservation Schema
const ReservationSchema = new Schema({
    index:Number,
    slot:{
        type:String,
        //required:true,
        //can i do that (make it enume and check on it or handel it in front end )
        // enum: slots.get()
    },
    reservationDate:{
        type:Date,
        //required:true
    },
    reserver:{
        type:InfoSchema,
       // required:true
    },
    isAccpted:{
        type:Boolean,
        default:false
       // required:true
    },
},{ _id : false })
//Room for coworkingSpace
const RoomSchema = new Schema({
    capacity: {
        type: Number,
        required: true
    },
    slots: {
        type: [String]
    },
    reviews: [{
        reviewers: {
            type: InfoSchema,
         //   required: true
        },
        comments: {
            type: InfoSchema,
            //required: true
        }
    }],
    reservations:[ReservationSchema],
    coworkingSpace:InfoSchema

});
const Room = mongoose.model('rooms', RoomSchema)
module.exports = Room