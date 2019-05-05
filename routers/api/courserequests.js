//1WT
// Dependencies
const express = require('express')
const router = express.Router()
const Joi = require('joi')


// Models
const CourseRequest = require('../../models/CourseRequest.js')
const courseRequestValidator = require('../../validations/courseRequestValidations')

const Notification = require('../../models/Notification.js')
const User = require('../../models/User.js')
const Platform = require('../../models/Platform')


//get all courseRequest
router.get('/', async (req, res) => {
    const courseRequests = await CourseRequest.find()
    res.json({ data: courseRequests })
})

//get Certin courseRequest
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const courseRequest = await CourseRequest.findOne({ _id: id })
    res.json({ msg: 'get the courseRequest successfully', data: courseRequest })

})

// Create a courseRequest
router.post('/', async (req, res) => {
    try {
        const isValidated = courseRequestValidator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newCourseRequest = await CourseRequest.create(req.body)
        const user = await User.findOne({ _id: req.body.applyingMemberId })
        if (user.courseRequests == undefined) user.courseRequests = []
        user.courseRequests.push({
            id: newCourseRequest._id,
            name: newCourseRequest.description,
            date: new Date().toJSON()
        })
        user.save()
      const platformItem=  await Platform.create({
            tags: ['Member'],
            type: 'CourseRequest',
            date: new Date().toJSON(),
            owner: {
                id: req.body.applyingMemberId ,
                name: user.memberFullName
            },
            data: {
                id: newCourseRequest._id,
                name: newCourseRequest.description,
            },
            description:newCourseRequest.description,

        })
        const members = await User.find({ tags: 'Member', isExpert:true })
        members.map((member) => {
            member.recomended.push({
                id:platformItem._id,
                type: 'CourseRequest',
                date: new Date().toJSON(),
                owner: {
                    id: req.body.applyingMemberId ,
                    name: user.memberFullName
                },
                data: {
                    id: newCourseRequest._id,
                    name: newCourseRequest.description,
                }
            })

            member.save()
        })
        res.json({ msg: 'courseRequest was created successfully', data: newCourseRequest })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

// Update a courseRequest
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const courseRequest = await CourseRequest.findOne({ _id: id })
        if (!courseRequest) return res.status(404).send({ error: 'courseRequest does not exist' })
        const isValidated = courseRequestValidator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const uCourseRequest = await CourseRequest.findOneAndUpdate({ _id: id }, req.body)
        res.json({ msg: 'CourseRequest updated successfully', data: uCourseRequest })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
//Delete an CourseRequest
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteCourseRequest = await CourseRequest.findOneAndRemove({ '_id': id })
        res.json({ msg: 'CourseRequest was deleted successfully', data: deleteCourseRequest })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})

//give reco
//1
router.put('/giveRecomendation/:id', async (req, res) => {
    try {
        console.log('here')
        const id = req.params.id
        const expertId = req.body.expertId
        const schema = {
            content: Joi.string().required(),
            expertId: Joi.string().required(),
        }
        const result = Joi.validate(req.body, schema)
        const schema1 = {
            masterClass: Joi.object().required(),
            expertId: Joi.string().required(),

        }
        const result1 = Joi.validate(req.body, schema1)


        if (result.error && result1.error) {
            if (result.error) return res.status(400).send(result.error.details[0].message)
            if (result1.error) return res.status(400).send(result1.error.details[0].message)
        }

        const expert = await User.findOne({ _id: expertId, tags: 'Member', isExpert: true })

        if (expert!=null) {

            const courseRequest = await CourseRequest.findById(id)

            if (courseRequest) {

                if (!result.error && !result1.error) {
                    courseRequest.recomendations.push({
                        expert: {
                            id: expert._id,
                            name: expert.memberFullName
                        },
                        masterClass: req.body.masterClass,
                        content: req.body.content,
                    })

                    Notification.sendCourseRecommendationsNotification(req.body.masterClass.name, expert._id, '%od elcourse dah yalaaa')
                    courseRequest.save()
                    return res.status(200).send('Done')

                }

                if (!result1.error) {
                    courseRequest.recomendations.push({
                        expert: {
                            id: expert._id,
                            name: expert.memberFullName
                        },
                        masterClass: req.body.masterClass,
                    })
                    Notification.sendCourseRecommendationsNotification(req.body.masterClass.name, expert._id, '%od elcourse dah yalaaa')
                    courseRequest.save()
                    return res.status(200).send('Done')
                }

                if (!result.error) {
                    courseRequest.recomendations.push({
                        expert: {
                            id: expert._id,
                            name: expert.memberFullName
                        },
                        content: req.body.content,
                    })

                    Notification.sendCourseRecommendationsNotification(req.body.content, expert._id, '%od elcourse dah yalaaa')
                    courseRequest.save()
                    return res.status(200).send('Done')
                }
            }
            else {
                res.send('Not request')
            }
        } else {
            res.send('Not expert')
        }
    }
    catch (error) {
        console.error(error)
        res.status(404).send('Not found')
    }

})
// rating a recomendations
router.put('/raterecomendation/:id', async (request, response) => {
    try {
        const courseId = request.params.id
        const rating = request.body.rating
        const reviewer = request.body.reviewer

        const schema = {
            rating: Joi.number().valid(0,1, 2, 3, 4, 5).required(),
            reviewer: Joi.object().required()
        }
        const result = Joi.validate(request.body, schema)
        if (result.error) return response.status(400).send({ error: result.error.details[0].message })
        console.log(courseId)

        const course = await CourseRequest.findById(courseId)

        if (course) {
            if(course.ratings==undefined) course.ratings=[]
            let ratings=course.ratings.filter((rate=> rate.reviewer.id!=reviewer.id))

            ratings.push({
                reviewer:reviewer,
                rate:rating
            })
            course.ratings=ratings
            course.save()
            response.sendStatus(200)

        }else{
            response.status(404).send('Not Found')
        }
    } catch (error) {
        response.status(404).send(error)

    }
})


module.exports = router