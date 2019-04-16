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
        await User.findByIdAndUpdate(request.params.id, { coworkingSpaceDateJoined: new Date().getDate() })
        await User.findByIdAndUpdate(request.params.id, { $push: { tags: 'CoworkingSpace' } })
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
            const deletedCoworkingSpace = await User.findOneAndUpdate({ _id: id }, { tags: currCoworkingSpace.tags.splice(index, 1) })
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
        res.status(200).send(coworkingSpaceOld);

    } catch(err){
        res.status(404).send('Not found');

    }
})
// show all rooms
// I thought that room id should send in req body not in params
router.get('/room/:id', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    if (coworkingSpace) {
        res.json({ data: coworkingSpace.coworkingSpaceRooms })
    } else {
        res.status(404).send('Not found');
    }
})
// show specific room
// I thought that room id should send in req body not in params
router.get('/room/:id/:roomId', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    if (coworkingSpace) {
        const room = coworkingSpace.coworkingSpaceRooms.find(room => room.id == req.params.roomId);
        res.json({ data: room })
    } else {
        res.status(404).send('Not found');

    }
})
// delete room
router.delete('/room/:id/:roomId', async (req, res) => {
    const coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
    var isExsits = false
    if (coworkingSpace) {
        const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
        for (var index = 0; index < coworkingSpaceRooms.length; index++) {
            if (coworkingSpaceRooms[index].id == req.params.roomId) {
                const newRooms = coworkingSpaceRooms.splice(index, 1)
                const coworkingSpaceNew = await User.findOneAndUpdate({ _id: req.params.id }, { coworkingSpaceRooms: coworkingSpaceRooms })
                const room = await Room.findByIdAndRemove(req.params.roomId)
                isExsits = true
                return res.status(200).send(room)
            }
        }
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
        if (coworkingSpace) {
            const oldroom = await Room.findOneAndUpdate({ _id: req.params.roomId }, req.body)
            if (oldroom) {
                const room = await Room.findById(req.params.roomId)
                const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
                for (var index = 0; index < coworkingSpaceRooms.length; index++) {
                    if (coworkingSpaceRooms[index].id === room._id) {
                        coworkingSpaceRooms.splice(index, 1)
                        const newRooms = coworkingSpaceRooms.push({
                            id: room._id,
                            capacity: room.capacity,
                            slots: room.slots,
                            reviews: room.reviews,
                            comments: room.comments,
                            reservations: room.reservations
                        })
                        const coworkingSpaceNew = await User.findOneAndUpdate({ _id: req.params.id }, { coworkingSpaceRooms: newRooms })
                        isExsits = true
                        return res.status(200).send(room)
                    }
                }
                if (!isExsits) return res.status(404).send('room not found');
            } else
                res.status(404).send('room not found')
        } else
            res.status(404).send('room not found')
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
        if (coworkingSpace) {
            const oldroom = await Room.findById( req.params.roomId)
            if (oldroom) {                
                const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
                for (var index = 0; index < coworkingSpaceRooms.length; index++) {
                    if (coworkingSpaceRooms[index].id === oldroom._id) {
                        coworkingSpace.coworkingSpaceRooms.reservations.push(req.body)
                        oldroom.reservations.push(req.body)
                        oldroom.save()
                        coworkingSpace.save()
                        isExsits = true
                        return res.status(200).send(oldroom)
                    }
                }
                if (!isExsits) return res.status(404).send('room not found');
            } else
                res.status(404).send('room not found')
        } else
            res.status(404).send('room not found')
    } catch (err) {
        console.log(err)
    }
})
//accept reservation for coworkingSpace 
router.put('/reservation/:id/:roomId', async (req, res) => {

    try {
        const state = req.body.state
        const index = req.body.index
        if (!state) {
            //here we should send notifcation  
            return res.status(200).send('Notification of reject reservation is sent')
        } else {
            var coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
            var isResverved = false
            // const coworkingSpaceRooms = coworkingSpace.coworkingSpaceRooms
            var room = coworkingSpace.coworkingSpaceRooms.find(room => room.id === req.params.roomId)
            const roomReservations = room.reservations
            var reserved = room.reservations[index]
            for (var pos = 0; pos < roomReservations.length; pos++) {
                if (pos != index & roomReservations[pos].slot === reserved.slot & roomReservations[pos].reservationDate === reserved.reservationDate & roomReservations[pos].isAccpted) {
                    isResverved = true
                    return res.status(404).send('Not found');
                }
            }
            if (!isResverved) {
                reserved.isAccpted = state

                room.reservations.splice(index, 1)
                room.reservations.splice(index, 0, reserved)
                //this may not work so i should loop on rooms to updated this room reservations explictly
                coworkingSpace.save()
                //coworkingSpace = await User.findOneAndUpdate({ _id: req.params.id, tags: 'CoworkingSpace' },{coworkingSpaceRooms:room})
                const updateRoom = await Room.findOneAndUpdate({ _id: req.params.roomId }, { reservations: room.reservations })
                coworkingSpace = await User.findOne({ _id: req.params.id, tags: 'CoworkingSpace' })
                return res.status(200).send(coworkingSpace);

            }
        }
    } catch (err) {
        console.log(err)
    }
})
module.exports = router
