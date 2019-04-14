const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');

const MasterClass = require('../../models/MasterClass.js')
const masterClassValidator = require('../../validations/MasterClassValidations.js')

//MasterClass CRUDS

//creat masterClass 
router.post('/', async (req, res) => {
    try {
        const isValidated = masterClassValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const masterClass = await MasterClass.create(req.body)
        res.send({ msg: 'MasterClass is created ', data: masterClass });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Cousres
//1
router.get('/', async (req, res) => {
    try {
        const masterClasses = await MasterClass.find();
        if (!masterClasses) return res.status(404).send({ error: 'masterClasss do not exist' })
        res.json({ msg: 'You get the masterClass', data: masterClasses })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//(id  => MasterClassId)
//get masterClass by id using mongo
//1
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const masterClassFind = await MasterClass.findById(id);
        if (!masterClassFind) return res.status(404).send({ error: 'masterClass does not exist' })
        res.json({ msg: 'You get the masterClass', data: masterClassFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update masterClass using mongo
//(masterClass_id => masterClassId)
//1
router.put('/:id', async (req, res) => {
    try {
        const masterClassId = req.params.id
        const isValidated = masterClassValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedMasterClass = await MasterClass.findOneAndUpdate({ '_id': masterClassId }, req.body)
        console.log(updatedMasterClass)
        const cousreAfterUpdate = await MasterClass.findById(masterClassId)
        console.log(cousreAfterUpdate)
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//(id  => educational_organizationId  ,masterClass_id => masterClassId)
//delete masterClass using mongo
//1
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedformMasterClass = await MasterClass.findOneAndRemove({ '_id': id })
        if (!deletedformMasterClass) return res.send('Not found')
        res.send(deletedformMasterClass)

    }
    catch (error) {
        res.sendStatus(404).send('Not found');
    }

});

// End of MasterClass CRUDS



//Badr

router.put('/applyforamasterClass/:id', async (request, response) => {
    const masterClassId = request.params.id;
    const memberId = request.body.memberId;
    const schema = {
        memberId: Joi.number().required(),
    }
    const result = Joi.validate(request.body, schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });
    const masterClass = await MasterClass.findById(masterClassId)
    masterClass.listOfApplies.push({ 'memberId': memberId, dateofapply: moment().format('MMMM Do YYYY, h:mm:ss a') })
    masterClass.save()
    response.sendStatus(200);
});
//End Badr
module.exports = router;