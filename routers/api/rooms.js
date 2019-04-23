const express = require('express');
const router = express.Router();

const Room = require('../../models/Room');
const roomValidator = require('../../validations/roomValidations')
const User = require('../../models/User')

//create stand alone room
router.post('/', async (req, res) => {
    try {
        const isValidated = roomValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
       const roomobj=new Room({
        capacity: req.body.capacity,
        slots: req.body.slots,
        reviews: [],
        reservations:[],
        coworkingSpaceID:null,
        coworkingSpaceName:null,
       })
        const room = await roomobj.save()
        res.send(room);
    } catch (error) {
        // We will be handling the error later
        res.status(404).send(error.message)
    }

})


//create a coworking space room
router.post('/coworking/:coworkingID', async (req, res) => {
    try {
        const isValidated = roomValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const coworkingSpace = await User.findOne({ _id: req.params.coworkingID, tags: 'CoworkingSpace' })
        if(!coworkingSpace){return res.status(400).send( 'this coworking space doesnt exist' )};


       const roomobj=new Room({
        capacity: req.body.capacity,
        slots: req.body.slots,
        reviews: [],
        reservations:[],
        coworkingSpaceID:req.params.coworkingID,
        coworkingSpaceName:coworkingSpace.coworkingSpaceName,
       })
        const room = await roomobj.save()
        res.send(room);
    } catch (error) {
        // We will be handling the error later
        res.status(404).send(error.message)
    }

})

// show all rooms  
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find()
        if (!rooms) return res.status(404).send({ error: 'rooms do not exist' })
        res.send(rooms);
    }
    catch (error) {
        res.status(404).send('Not found')
    }

})

// show all coworking space rooms  
router.get('/coworking/:coworkingID', async (req, res) => {
    try {
        const rooms = await Room.find()
        if (!rooms) return res.status(404).send({ error: 'rooms do not exist' })
        var coRooms=[]
        rooms.map(room=>{
            if(room.coworkingSpaceID==req.params.coworkingID) {coRooms.push(room)}
        })
       


        res.send(coRooms);
    }
    catch (error) {
        res.status(404).send('Not found')
    }

})
// show one rooms  
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const roomFind = await Room.findById(id);
        if (!roomFind) return res.status(404).send({ error: 'room does not exist' })
        res.send(roomFind)
    }
    catch (error) {
        res.sendStatus(404)
    }
})


// update room
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const isValidated = roomValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        await Room.findOneAndUpdate({ _id: id }, req.body)
        const room = await Room.findOne({ _id: id })
        if (room) {
            const coworkingSpace = await User.findById(room.coworkingSpace.id)
            const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
            for (var index = 0; index < coworkingSpaceRooms.length; index++) {
                if (coworkingSpaceRooms[index].id === room._id) {
                    oworkingSpace.coworkingSpaceRooms.splice(index, 1)
                    coworkingSpace.coworkingSpaceRooms.push({
                        id: room._id,
                        capacity: room.capacity,
                        slots: room.slots,
                        reviews: room.reviews,
                        comments: room.comments,
                        reservations: room.reservations
                    })
                    coworkingSpace.save()
                    //const coworkingSpaceNew = await User.findOneAndUpdate({ _id: room.coworkingSpace.id }, { coworkingSpaceRooms: newRooms })

                }
            }
            res.send(room)
        } else
            res.send('room not found')

    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Cannot find it ')
    }

})



// Delete Room
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const room = await Room.findByIdAndRemove(id)
        res.send(room)
    }
    catch (error) {
        res.status(404).send('Cannot find it ')
    }
})


// reserve room
router.put('/:id/reserve', async (req, res) => {
    try {
        const isValidated = roomValidator.reserveValidation(req.body)
 
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
       const room= await Room.findOneAndUpdate({_id:req.params.id}, { $push: { reservations: req.body } })
        res.send(room)
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})





//accept reservation
router.put('/:id/accept/:reservationID', async (req, res) => {
    const oldroom = await Room.findById(req.params.id)
    var reservationfound;
    var oldReservationIndex;
    if ( oldroom) {
       oldroom.reservations.map((reservation,index)=>{
           if(reservation._id==req.params.reservationID){
            reservationfound=reservation;
            reservationfound.isAccpted=true;
            oldReservationIndex=index;
           }
       });
       if (!reservationfound) return res.status(400).send( 'reservation not found' )
       oldroom.reservations.splice(oldReservationIndex,1)
       oldroom.reservations.push(reservationfound)
      oldroom.save().then((room)=>{
        res.status(200).send(room)
      }
      ).catch((error)=>{
        res.status(404).send(error)
      })
         }

})

//delete reservation
router.delete('/:id/delete/:reservationID', async (req, res) => {
    const oldroom = await Room.findById(req.params.id)
    var reservationfound;
    var oldReservationIndex;
    if ( oldroom) {
       oldroom.reservations.map((reservation,index)=>{
           if(reservation._id==req.params.reservationID){
            reservationfound=reservation;
            oldReservationIndex=index;
           }
       });
       if (!reservationfound) return res.status(400).send( 'reservation not found' )
       oldroom.reservations.splice(oldReservationIndex,1)
    
      oldroom.save().then((room)=>{
        res.status(200).send(room)
      }
      ).catch((error)=>{
        res.status(404).send(error)
      })
         }

})

module.exports = router