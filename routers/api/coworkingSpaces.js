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
        await User.findByIdAndUpdate(request.params.id, { coworkingSpaceDateJoined: new Date().getDate(), $push: { tags: 'CoworkingSpace' } })
        const coworkingSpace = await User.findById(request.params.id)
        response.send(coworkingSpace);

    } catch (err) {
        // We will be handling the error later
        response.status(404).send('error')
    }
})
//get all CoworkingSpace
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
        var deletedCoworkingSpace;
        if (currCoworkingSpace) {
            const index = currCoworkingSpace.tags.indexOf('CoworkingSpace')
            if(index===0){
                deletedCoworkingSpace  = await User.findOneAndUpdate({ _id: id }, { tags: [] })
            }
            else{
               deletedCoworkingSpace = await User.findOneAndUpdate({ _id: id }, { tags: currCoworkingSpace.tags.splice(index, 1) })
            }

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


module.exports = router