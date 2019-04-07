const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');

const Course = require('../models/Course.js')
const courseValidator = require('../validations/CourseValidations.js')

//Course CRUDS

//creat course 
router.post("/", async (req, res) => {
    try {
        const isValidated = courseValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const course = await Course.create(req.body)
        res.send({ msg: "Course is created ", data: course });
    } catch (error) {
        // We will be handling the error later
        res.status(404).send("Not found")
    }

})

//get Show all Cousres
//1
router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses) return res.status(404).send({ error: 'courses do not exist' })
        res.json({ msg: 'You get the course', data: courses })
    }
    catch (error) {
        res.status(404).send("Not found")
    }
});

//(id  => CourseId)
//get course by id using mongo
//1
router.get("/:id", async (req, res) => {
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
//(course_id => courseId)
//1
router.put("/:id", async (req, res) => {
    try {
        const courseId = req.params.id
        const isValidated = courseValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const updatedCourse = await Course.findOneAndUpdate({ "_id": courseId }, req.body)
        console.log(updatedCourse)
        const cousreAfterUpdate = await Course.findById(courseId)
        console.log(cousreAfterUpdate)
        res.json({ data: cousreAfterUpdate});
    } catch (error) {
        // We will be handling the error later
        res.status(404).send("Not found")
    }
});

//(id  => educational_organizationId  ,course_id => courseId)
//delete course using mongo
//1
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const deletedformCourses = await Course.findOneAndRemove({ "_id": id })
        console.log(id)
        res.send(deletedformCourses)
        if (!deletedformCourses) return res.send('Not found')
        console.log(id)
        var courses = await Course.find()
        res.json({ data: courses })
    }
    catch (error) {
        res.sendStatus(404).send("Not found");
    }

});

// End of Course CRUDS



//Badr

router.put('/applyforacourse/:id', async (request, response) => {
    const courseId = request.params.id;
    const memberId = request.body.memberId;
    const schema = {
        memberId: Joi.number().required(),
    }
    const result = Joi.validate(request.body, schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });
    const course = await Course.findById(courseId)
    course.listOfApplies.push({ 'memberId': memberId, dateofapply: moment().format('MMMM Do YYYY, h:mm:ss a') })
    course.save()
    response.sendStatus(200);
});
//End Badr
module.exports = router;