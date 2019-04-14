const express = require('express');
const router = express.Router();

const Course = require('../../models/Course.js')
const courseValidator = require('../../validations/CourseValidations.js')

//Course CRUDS

//creat course 
router.post('/', async (req, res) => {
    try {
        const isValidated = courseValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const course = await Course.create(req.body)
        res.send({ msg: 'Course is created ', data: course });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }

})

//get Show all Cousres
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) return res.status(404).send({ error: 'courses do not exist' })
        res.json({ msg: 'You get the course', data: courses })
    }
    catch (error) {
        res.status(404).send('Not found')
    }
});

//get course by id using mongo
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const courseFind = await Course.findById(id);
        if (!courseFind) return res.status(404).send({ error: 'course does not exist' })
        res.json({ msg: 'You get the course', data: courseFind })
    }
    catch (error) {
        res.sendStatus(404)
    }
});

//update course using mongo
router.put('/:id', async (req, res) => {
    try {
        const courseId = req.params.id
        const isValidated = courseValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedCourse = await Course.findOneAndUpdate({ '_id': courseId }, req.body)
        const cousreAfterUpdate = await Course.findById(courseId)
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send('Not found')
    }
});

//delete course using mongo
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedformCourses = await Course.findOneAndRemove({ '_id': id })
        console.log(id)
        res.send(deletedformCourses)
        if (!deletedformCourses) return res.send('Not found')
        console.log(id)
        var courses = await Course.find()
        res.json({ data: courses })
    }
    catch (error) {
        res.sendStatus(404).send('Not found');
    }

});
// End of Course CRUDS
module.exports = router;