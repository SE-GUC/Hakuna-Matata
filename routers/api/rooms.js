const express = require('express');
const router = express.Router();

const Room = require('../../models/Room');
const roomValidator = require('../../validations/roomValidations')
const User = require('../../models/User')

router.post('/', async (req, res) => {
    try {
        const isValidated = roomValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const room = await Room.create(req.body)
        res.send(room);
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
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
                    coworkingSpaceRooms.splice(index, 1)
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
module.exports = router