
const express = require('express');
const router = express.Router();


const TrainingProgram = require('../../models/TrainingProgram.js')
const trainingProgramValidator = require('../../validations/trainingProgramsValidations.js')

//TrainingProgram CRUDS

//creat trainingProgram 
router.post('/', async (req, res) => {
    try {
        const isValidated = trainingProgramValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const trainingProgram = await TrainingProgram.create(req.body)
        res.send({ msg: 'TrainingProgram is created ', data: trainingProgram });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Cousres
//1
router.get('/', async (req, res) => {
    try {
        const trainingPrograms = await TrainingProgram.find();
        if (!trainingPrograms) return res.status(404).send({ error: 'trainingPrograms do not exist' })
        res.json({ msg: 'You get the trainingProgram', data: trainingPrograms })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//(id  => TrainingProgramId)
//get trainingProgram by id using mongo
//1
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const trainingProgramFind = await TrainingProgram.findById(id);
        if (!trainingProgramFind) return res.status(404).send({ error: 'trainingProgram does not exist' })
        res.json({ msg: 'You get the trainingProgram', data: trainingProgramFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update trainingProgram using mongo
//(trainingProgram_id => trainingProgramId)
//1
router.put('/:id', async (req, res) => {
    try {
        const trainingProgramId = req.params.id
        const isValidated = trainingProgramValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedTrainingProgram = await TrainingProgram.findOneAndUpdate({ '_id': trainingProgramId }, req.body)
        console.log(updatedTrainingProgram)
        const cousreAfterUpdate = await TrainingProgram.findById(trainingProgramId)
        console.log(cousreAfterUpdate)
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//(id  => educational_organizationId  ,trainingProgram_id => trainingProgramId)
//delete trainingProgram using mongo
//1
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedformTrainingPrograms = await TrainingProgram.findOneAndRemove({ '_id': id })
        console.log(id)
        res.send(deletedformTrainingPrograms)
        if (!deletedformTrainingPrograms) return res.send('Not found')
        console.log(id)
        var trainingPrograms = await TrainingProgram.find()
        res.json({ data: trainingPrograms })
    }
    catch (error) {
        res.sendStatus(404).send('Not found');
    }

});

// End of TrainingProgram CRUDS




module.exports = router;