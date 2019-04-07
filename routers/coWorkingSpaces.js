const express = require('express');
const router = express.Router();

const Room = require('../models/Room');
const roomValidator = require('../validations/roomValidations')
const CoWorkingSpace = require('../models/coWorkingSpace')
const coWorkingSpaceValidator = require('../validations/coWorkingSpaceValidations.js')


// CRUD
// Partner Creates CoWorking Space
// it will be chnaged ro be user id since its a user in the site
router.post("/:partnerId", async (req, res) => {

    try {
        const isValidated = coWorkingSpaceValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const coWorkingSpace = new CoWorkingSpace({
            partnerId: req.params.partnerId,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            location: req.body.location,
            businessPlans: req.body.businessPlans,
            facilites: req.body.facilites,
            rooms: [],
            maxNoRooms: req.body.maxNoRooms
        })
        // coWorkingSpace as Schema or model
        await coWorkingSpace.save();
        res.send(coWorkingSpace);


    }
    catch (error) {
        // We will be handling the error later
        res.status(404).send('Cannot create')
    }

})

// Read All coWorkingSpaces
router.get("/", async (req, res) => {
    try {
        const coWorkingSpaces = await CoWorkingSpace.find()
        res.send(coWorkingSpaces)
    }
    catch (error) {
        res.status(404).send('there is some errors to find that collection')
    }
})
// Read one coWorkingSpaces by Its id
router.get("/:id", async (req, res) => {
    try {
        const coWorkingSpace = await CoWorkingSpace.findOne({'_id':req.params.id})
        res.send(coWorkingSpace)
    }
    catch (error) {
        res.status(404).send('Not found');
    }
})
// (id  => coworking_spaces)
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const oldCoWorkingSpace = await CoWorkingSpace.findById(id)
        if (!oldCoWorkingSpace) return res.status(404).send({ error: 'CoWorkingSpace does not exist ' })

        const isValidated = coWorkingSpaceValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        // if (req.body.name != null) oldCoWorkingSpace.name = req.body.name
        // if (req.body.partnerId != null) oldCoWorkingSpace.partnerId = req.body.partnerId
        // if (req.body.phone_number != null) oldCoWorkingSpace.phone_number = req.body.phone_number
        // if (req.body.location != null) oldCoWorkingSpace.location = req.body.location
        // if (req.body.business_plans != null) oldCoWorkingSpace.business_plans = req.body.business_plans
        // if (req.body.facilites != null) oldCoWorkingSpace.facilites = req.body.facilites
        // if (req.body.rooms != null) oldCoWorkingSpace.business_plans = req.body.rooms
        // if (req.body.max_no_rooms != null) oldCoWorkingSpace.business_plans = req.body.max_no_rooms
        // oldCoWorkingSpace.save()
        const updatedCoWorkingSpace0 = await CoWorkingSpace.findOneAndUpdate(
            { _id: id },
            req.body
          );
        const updatedCoWorkingSpace = await CoWorkingSpace.findById(id)
        
        res.send(updatedCoWorkingSpace);
    } catch (err) {
        res.status(404).send('Not found');
    }

})
// Delete coWorking Space
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const coWorkingSpace = await CoWorkingSpace.findByIdAndRemove(id)
        res.send(coWorkingSpace)
    }
    catch (error) {
        // We will be handling the error later
        res.status(404).send('Cannot find it ')
    }
})
// End CRUD

// room CRUD
// Create Room 
// End room CRUD

//(id  => coworking_spaces) // show all rooms
router.get('/readRooms/:id', async (req, res) => {
    try {
        const coWorkingSpace = await CoWorkingSpace.findById(req.params.id)
        if (!coWorkingSpace) return res.status(404).send({ error: 'this coWorking Space rooms do not exist' })
        res.send(coWorkingSpace.rooms);
    }
    catch (error) {
        res.status(404).send("Not found")
    }

})
// create room
// change in the body of Coworking Space and new body in Room so it should be put or post 
router.put("/addRoom/:id", async(req, res) => {
    try {
        const isValidated = roomValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
       
        CoWorkingSpace.findById(req.params.id, function(err, coWorkingSpace) {
          
    if(!err){
        
        if(coWorkingSpace.maxNoRooms>coWorkingSpace.rooms.length){
       const rooom =  new Room ({
        reservedId:req.body.reservedId,
        capacity:req.body.capacity,
        reservedDate:req.body.reservedDate,
        endOfReservation:req.body.endOfReservation,
        reserved:req.body.reserved
        
        
    });
    Room.create(rooom);
    coWorkingSpace.rooms.push(rooom);
        res.send(rooom);
        coWorkingSpace.save();
    return;
    }
    res.send("YOU CANT ADD ROOM");
    
      }
      else{
        res.status(404).send('Not found');

      }
  });
}catch{
    res.status(404).send('Not found');

}})

//accept reservation for co-working 
//reserve workshop for a course 
router.put('/acceptReservation/:id/:roomId', async (req, res) => {
    try {
        const isValidated = roomValidator.reserveValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        CoWorkingSpace.findById(req.params.id, async function (err, co) {
            if (!err) {
                if (co !== null) {
                    const roooms = co.rooms;
                    const rooom = roooms.find(m => m._id == req.params.roomId);
                    if (rooom != null) {
                        if (rooom.reserved === false) {
                            rooom.reservedId = req.body.reservedId;
                            rooom.reserved = true;
                            rooom.reservedDate = req.body.reservedDate;
                            rooom.endOfReservation = req.body.endOfReservation;
                            await CoWorkingSpace.findOneAndUpdate({ "_id": req.params.id }, { "rooms": co.rooms });
                            const w = await Room.findOneAndUpdate({ '_id': req.params.roomId }, {
                                reservedId: req.body.reservedId,
                                reserved: true,
                                reservedDate: req.body.reservedDate,
                                endOfReservation: req.body.endOfReservation
                            })
                            res.send(rooom);
                            return;
                        };
                        res.status(404).send("this room is not available");
                    } else {
                        res.status(404).send('Not found room');
                    }
                }
                else {
                    res.status(404).send('Not found cowrking space');
                }
            }
            else {
                res.status(404).send('Not found cowrking space');
            }
        })
    } catch (err) {
        console.log(err)
    }



})
//(id  => coworking_spaces, room_id=>roomId) // show specific room
router.get('/showRoom/:id/:roomId',async (req, res) => {
    CoWorkingSpace.findById(req.params.id, function (err, co) {
        if (!err) {
            if (co !== null) {
                const ro = co.rooms.find(m => m._id == req.params.roomId);
                res.send(ro);
            }
            else {
                res.status(404).send('Not found');
            }
        }
        else {
            res.status(404).send('Not found');
        }
    })

})
//(id  => coworking_spaces, room_id=>roomId) // delete room
router.delete('/deleteRoom/:id/:roomId',async (req, res) => {
    CoWorkingSpace.findById(req.params.id, function (err, co) {
        if (!err) {
            const ro = co.rooms.find(m => m._id == req.params.roomId);
            co.rooms.remove(ro)
            co.save();
            res.send(ro);
        }
        else {
            res.status(404).send('Not found');

        }
    });

})
//(id  => coworking_spaces, room_id=>roomId) // update room
router.put('/updateRoom/:id/:roomId', async (req, res) => {
    try {
        const isValidated = roomValidator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        CoWorkingSpace.findById(req.params.id, async function (err, co) {
            if (!err) {
                const ro = co.rooms.find(m => m._id == req.params.roomId)
                if (req.body.capacity != null) ro.capacity = req.body.capacity
                if (req.body.reserved != null) ro.reserved = req.body.reserved
                if (req.body.reservedDate != null) ro.reservedDate = req.body.reservedDate
                if (req.body.endOfReservation != null) ro.endOfReservation = req.body.endOfReservation
                if (req.body.reservedId != null) ro.reservedId = req.body.reservedId
                await Room.findOneAndUpdate({ '_id': req.params.roomId }, { "capacity": ro.capacity, "reserved": ro.reserved, "reservedDate": ro.reservedDate, "endOfReservation": ro.endOfReservation, "reservedId": ro.reservedId })
                await CoWorkingSpace.findOneAndUpdate({ '_id': req.params.id }, { "rooms": co.rooms })
                res.send(ro);
            }
            else {
                res.status(404).send('Not found');
            }
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
