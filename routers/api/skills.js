
const express = require('express');
const router = express.Router();


const Skill = require('../../models/Skill.js')
const SkillValidator = require('../../validations/SkillsValidations.js')

//Skill CRUDS

//creat Skill 
router.post('/', async (req, res) => {
    try {
        const isValidated = SkillValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const skill = await Skill.create(req.body)
        res.send({ msg: 'Skill is created ', data: skill });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Skills
//1
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find();
        if (!skills) return res.status(404).send({ error: 'Skills do not exist' })
        res.json({ msg: 'You get the Skill', data: skills })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//(id  => SkillId)
//get Skill by id using mongo
//1
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const skillFind = await Skill.findById(id);
        if (!skillFind) return res.status(404).send({ error: 'Skill does not exist' })
        res.json({ msg: 'You get the Skill', data: skillFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update Skill using mongo
//(Skill_id => SkillId)
//1
router.put('/:id', async (req, res) => {
    try {
        const skillId = req.params.id
        const isValidated = SkillValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedSkill = await Skill.findOneAndUpdate({ '_id': skillId }, req.body)
        const cousreAfterUpdate = await Skill.findById(skillId)
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//(id  => educational_organizationId  ,Skill_id => SkillId)
//delete Skill using mongo
//1
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedformSkills = await Skill.findOneAndRemove({ '_id': id })
        res.send(deletedformSkills)
        if (!deletedformSkills) return res.send('Not found')
        var Skills = await Skill.find()
        res.json({ data: Skills })
    }
    catch (error) {
        res.sendStatus(404).send('Not found');
    }

});

// End of Skill CRUDS




module.exports = router;