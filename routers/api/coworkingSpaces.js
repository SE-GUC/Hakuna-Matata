const express = require('express');
const router = express.Router();

const Room = require('../../models/Room');
const roomValidator = require('../../validations/roomValidations')
const User = require('../../models/User')
const coworkingSpaceValidator = require('../../validations/coworkingSpaceValidations.js')
// coworkingSpace CRUD
router.post('/:id', async (request, response) => {
    try {
        const isValidated = coworkingSpaceValidator.createValidation(request.body);
        if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })

        const currUser = await User.findOne({ _id: request.params.id, tags: 'CoworkingSpace' })
        if (currUser) return response.status(404).send('You are already a CoworkingSpace on the site')
        await User.findByIdAndUpdate(request.params.id, request.body)
        await User.findByIdAndUpdate(request.params.id, { coworkingSpaceDateJoined: new Date().toJSON(), $push: { tags: 'CoworkingSpace' } })
        const coworkingSpace = await User.findById(request.params.id)
        response.send(coworkingSpace);

    } catch (err) {
        // We will be handling the error later
        response.status(404).send('error')
    }
})
//get all ConsultancyAgencies
router.get('/', async (req, res) => {
    const consultancyAgencies = await User.find({ tags: 'CoworkingSpace' })
    res.json({ data: consultancyAgencies })
})
//get Certin CoworkingSpace
router.get('/:id', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    res.json({ data: coworkingSpace })

})
// update CoworkingSpace  
router.put('/:id', async (req, res) => {
    const isValidated = coworkingSpaceValidator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    try {
        const coworkingSpace = await User.findOneAndUpdate({ _id: req.params.id, tags: 'CoworkingSpace' }, req.body)
        const updatedCoworkingSpace = await User.findById(req.params.id)
        res.send(updatedCoworkingSpace)
    } catch (error) {

    }
})
// Delete CoworkingSpace delete 
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const currCoworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })

        if (currCoworkingSpace) {
            const index = currCoworkingSpace.tags.indexOf('CoworkingSpace')
            const deletedCoworkingSpace = currCoworkingSpace.tags.splice(index, 1)
            currCoworkingSpace.save()
            res.json({ msg: 'CoworkingSpace was deleted successfully', data: deletedCoworkingSpace })
        } else {
            res.json({ msg: 'CoworkingSpace was deleted Already or Not Found' })
        }
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
// End coworkingSpace CRUD 


// // room CRUD

// create room
// change in the body of Coworking Space and new body in Room so it should be put or post 
router.post('/room/:id', async (req, res) => {
    try {

        const isValidated = roomValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

        const room = await Room.create(req.body)
        const coworkingSpaceOld = await User.findOneAndUpdate({ _id: req.params.id, tags: 'CoworkingSpace' }, {
            $push: {
                coworkingSpaceRooms: {
                    id: room._id,
                    capacity: room.capacity,
                    slots: room.slots,
                    reviews: room.reviews,
                    comments: room.comments,
                    reservations: room.reservations
                }
            }
        })
        coworkingSpaceOld.save()
        res.status(201).send(coworkingSpaceOld);

    } catch (err) {
        res.status(404).send(err);

    }
})
// show all rooms
// I thought that room id should send in req body not in params
router.get('/room/:id', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    if (coworkingSpace) return res.json({ data: coworkingSpace.coworkingSpaceRooms })
    res.status(404).send('Not found');

})
// show specific room
// I thought that room id should send in req body not in params
router.get('/room/:id/:roomId', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    if (!coworkingSpace) return res.status(404).send('Not found');
    const room = coworkingSpace.coworkingSpaceRooms.find(room => room.id == req.params.roomId);
    res.json({ data: room })
})
// delete room
router.delete('/room/:id/:roomId', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    var isExsits = false
    if (coworkingSpace) {
        const oldlength = coworkingSpace.coworkingSpaceRooms.length
        coworkingSpace.coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms.filter((room) => room.id != req.params.roomId)
        console.log(oldlength)
        console.log(coworkingSpace.coworkingSpaceRooms.length)
        if (oldlength > coworkingSpace.coworkingSpaceRooms.length) {
          const returnedroom=  await Room.findByIdAndRemove(req.params.roomId)
            isExsits = true
            coworkingSpace.save()
            return res.status(200).send(returnedroom)
        }
        // for (var index = 0; index < coworkingSpaceRooms.length; index++) {
        //     if (coworkingSpaceRooms[index].id == req.params.roomId) {
        //         const newRooms = coworkingSpaceRooms.splice(index, 1)
        //         const coworkingSpaceNew = await User.findOneAndUpdate({ _id: req.params.id }, { coworkingSpaceRooms: coworkingSpaceRooms })
        //         const room = await Room.findByIdAndRemove(req.params.roomId)
        //         isExsits = true
        //         return res.status(200).send(room)
        //     }
        // }
    }
    if (!isExsits) return res.status(404).send('Not found');

})
// update room
router.put('/room/:id/:roomId', async (req, res) => {
    try {
        const isValidated = roomValidator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const coworkingSpace = await User.findById(req.params.id)
        var isExsits = false
        const roomId = req.params.roomId
        if (coworkingSpace) {
            const oldroom = await Room.findOneAndUpdate({ _id: roomId }, req.body)
            if (oldroom) {
                const room = await Room.findById(roomId)
                const index = coworkingSpace.coworkingSpaceRooms.findIndex((csRoom) => csRoom.id == roomId)
                if (index != -1) {
                    coworkingSpace.coworkingSpaceRooms.splice(index, 1)
                    coworkingSpace.coworkingSpaceRooms.push({
                        id: room._id,
                        capacity: room.capacity,
                        slots: room.slots,
                        reviews: room.reviews,
                        comments: room.comments,
                        reservations: room.reservations
                    })
                    coworkingSpace.save()
                    isExsits = true
                    return res.status(200).send(room)
                }
                // const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
                // for (var index = 0; index < coworkingSpaceRooms.length; index++) {
                //     if (coworkingSpace.coworkingSpaceRooms[index].id == roomId) {
                //         coworkingSpace.coworkingSpaceRooms.splice(index, 1)
                //         coworkingSpace.coworkingSpaceRooms.push({
                //             id: room._id,
                //             capacity: room.capacity,
                //             slots: room.slots,
                //             reviews: room.reviews,
                //             comments: room.comments,
                //             reservations: room.reservations
                //         })
                //         coworkingSpace.save()
                //         isExsits = true
                //         return res.status(200).send(room)
                //     }

                // }
                if (!isExsits) return res.status(404).send('room not found in co');
            } else res.status(404).send('room not found')
        } else res.status(404).send('coworking room not found')
    } catch (err) {
        console.log(err)
    }
})
// update room
router.put('/room/reserve/:id/:roomId', async (req, res) => {
    try {
        const isValidated = roomValidator.reserveValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const coworkingSpace = await User.findById(req.params.id)
        var isExsits = false
        const roomId = req.params.roomId

        if (coworkingSpace) {
            const oldroom = await Room.findById(req.params.roomId)
            if (oldroom) {
                const index = coworkingSpace.coworkingSpaceRooms.findIndex((csRoom) => csRoom.id == roomId)
                if (index != -1) {
                    if (coworkingSpace.coworkingSpaceRooms[index].reservations == undefined) coworkingSpace.coworkingSpaceRooms[index].reservations = []
                    if (oldroom.reservations == undefined) oldroom.reservations = []
                    oldroom.reservations.push(req.body)
                    coworkingSpace.coworkingSpaceRooms[index].reservations.push(oldroom.reservations[oldroom.reservations.length - 1])
                    oldroom.save()
                    coworkingSpace.save()
                    isExsits = true
                    return res.status(200).send(oldroom)
                }
                // const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
                // for (var index = 0; index < coworkingSpaceRooms.length; index++) {

                //     if (coworkingSpaceRooms[index].id == roomId) {
                //         if (coworkingSpace.coworkingSpaceRooms[index].reservations == undefined) coworkingSpace.coworkingSpaceRooms[index].reservations = []

                //         oldroom.reservations.push(req.body)
                //         coworkingSpace.coworkingSpaceRooms[index].reservations.push(oldroom.reservations[oldroom.reservations.length - 1])
                //         oldroom.save()
                //         coworkingSpace.save()
                //         isExsits = true
                //         return res.status(200).send(oldroom)
                //     }
                // }
                if (!isExsits) return res.status(404).send('room not found1');
            } else res.status(404).send('room not found2')
        } else res.status(404).send('room not found')
    } catch (err) {
        console.log(err)
    }
})
//accept reservation for coworkingSpace 
router.put('/reservation/:id/:roomId', async (req, res) => {

    try {
        const state = req.body.state
        const reservationId= req.body.reservationId
        if (!state) {
            var coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
            var room = coworkingSpace.coworkingSpaceRooms.find(room => room.id == req.params.roomId)

            const pos = room.reservations.findIndex((reservation) => reservation._id == reservationId)
            if (pos != -1) {
                const deletedReservation = room.reservations.splice(pos - 1, 1)
                await Room.findOneAndUpdate({ _id: req.params.roomId }, { reservations: room.reservations })
                coworkingSpace.save()
                return res.status(200).send({ msg: 'Reservation is Deleted ', data: deletedReservation })
            }

            // const roomReservations = room.reservations
            // for ( var pos = 0; pos < roomReservations.length; pos++) {
            //         if (roomReservations[pos]._id == index) {
            //             const deletedReservation=     room.reservations.splice(pos - 1, 1)  
            //             const updateRoom = await Room.findOneAndUpdate({ _id: req.params.roomId }, { reservations: room.reservations })
            //             coworkingSpace.save()
            //             return res.status(200).send({msg :'Reservation is Deleted ',data :deletedReservation})
            //          }
            // }         
            return res.status(200).send('there is not such reservation here')
        } else {
            var coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
            var isResverved = false
            var room = coworkingSpace.coworkingSpaceRooms.find(room => room.id == req.params.roomId)
            const roomReservations = room.reservations
            var reserved = room.reservations.find(reservation => reservation._id == reservationId)
            var pos = 0
            for (pos = 0; pos < roomReservations.length; pos++) {
                if (roomReservations[pos].slot === reserved.slot & roomReservations[pos].reservationDate.getTime() == reserved.reservationDate.getTime() & roomReservations[pos].isAccpted) {
                    if (roomReservations[pos]._id == reservationId) return res.status(200).send('you have already reserve it ');
                    isResverved = true
                    return res.status(404).send('is already accepted');
                }
            }
            if (!isResverved) {
                reserved.isAccpted = state
                room.reservations.splice(pos - 1, 1)
                room.reservations.splice(pos - 1, 0, reserved)
                for (var i = 0; i < room.reservations.length; i++) {
                    if (room.reservations[i]._id != reservationId & room.reservations[i].slot === reserved.slot & room.reservations[i].reservationDate.getTime() == reserved.reservationDate.getTime()) {
                        room.reservations.splice(i, 1)
                        i--

                    }
                }
                coworkingSpace.save()
                await Room.findOneAndUpdate({ _id: req.params.roomId }, { reservations: room.reservations })
                coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
                return res.status(200).send(coworkingSpace);

            }
        }
    } catch (err) {
        console.log(err)
    }
})
module.exports = router
