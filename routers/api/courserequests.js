//1WT
// Dependencies
const express = require('express')
const router = express.Router()
<<<<<<< HEAD
=======
var moment = require('moment')
>>>>>>> master
const Joi = require('joi')


// Models
const CourseRequest = require('../../models/CourseRequest.js')
const courseRequestValidator = require('../../validations/courseRequestValidations')

const Notification = require('../../models/Notification.js')
<<<<<<< HEAD
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
=======
const  User  = require('../../models/User.js')


//get all courseRequest
router.get('/', async (req,res) => {
    const courseRequests = await CourseRequest.find()
    res.json({data: courseRequests})
})

//get Certin courseRequest
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const courseRequest = await CourseRequest.findOne({_id:id})
    res.json({msg:'get the courseRequest successfully', data: courseRequest})
>>>>>>> master

})

// Create a courseRequest
<<<<<<< HEAD
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
=======
router.post('/', async (req,res) => {
   try {
    const isValidated = courseRequestValidator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newCourseRequest = await CourseRequest.create(req.body)
    res.json({msg:'courseRequest was created successfully', data: newCourseRequest})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a courseRequest
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const courseRequest = await CourseRequest.findOne({_id:id})
     if(!courseRequest) return res.status(404).send({error: 'courseRequest does not exist'})
     const isValidated = courseRequestValidator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const uCourseRequest = await CourseRequest.findOneAndUpdate({_id:id},req.body)
     res.json({msg: 'CourseRequest updated successfully', data: uCourseRequest})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
//Delete an CourseRequest
 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deleteCourseRequest = await CourseRequest.findOneAndRemove({'_id': id})
     res.json({msg:'CourseRequest was deleted successfully', data: deleteCourseRequest})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })
>>>>>>> master

//give reco
//1
router.put('/giveRecomendation/:id', async (req, res) => {
    try {
<<<<<<< HEAD
        console.log('here')
        const id = req.params.id
        const expertId = req.body.expertId
        const schema = {
            content: Joi.string().required(),
            expertId: Joi.string().required(),
=======
        const id = req.params.id
        const expertId=req.body.expertId
        const schema = {
            content: Joi.string().required(),
>>>>>>> master
        }
        const result = Joi.validate(req.body, schema)
        const schema1 = {
            masterClass: Joi.object().required(),
<<<<<<< HEAD
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
=======
        }
        const result1 = Joi.validate(req.body, schema1)
        if (result.error&&result1.error) {
            if (result.error) return res.status(400).send(result.error.details[0].message)
            if (result1.error) return res.status(400).send(result1.error.details[0].message)
    }

        const expert = await User.findOne({_id:expertId,tags:'Member',isExpert:true})
        if(expert){
        const courseRequest = await CourseRequest.findById(id)
        if (courseRequest) {
            if(!result.error&&!result1.error){
            courseRequest.recomendations.push({
                expert:{
                id:expert._id,
                name:expert.memberFullName
                },
                masterClass:req.body.masterClass,
                content:req.body.content,
            })
            Notification.sendCourseRecommendationsNotification(req.body.masterClass, expert._id, '%od elcourse dah yalaaa')
            courseRequest.save()
            return res.status(200).send('Done')

        }
        if(!result1.error){
            courseRequest.recomendations.push({
                expert:{
                id:expert._id,
                name:expert.memberFullName
                },
                masterClass:req.body.masterClass,
            })
            Notification.sendCourseRecommendationsNotification(req.body.masterClass, expert._id, '%od elcourse dah yalaaa')
            courseRequest.save()
            res.status(200).send('Done')
            return res.status(200).send('Done')
        }
        if(!result.error){
            courseRequest.recomendations.push({
                expert:{
                id:expert._id,
                name:expert.memberFullName
                },
                content:req.body.content,
            })
            Notification.sendCourseRecommendationsNotification(req.body.content, expert._id, '%od elcourse dah yalaaa')
            courseRequest.save()
            return res.status(200).send('Done')
        }    
        }
        else {
            res.status(404).send('Not found')
        }
    }else{
        res.status(404).send('Not expert')
    }
    }
    catch (error) {
        // We will be handling the error later
>>>>>>> master
        res.status(404).send('Not found')
    }

})
// rating a recomendations
<<<<<<< HEAD
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
=======
router.put('/raterecomendation/:id/:recId', async (request, response) => {
    try{
    const courseId = request.params.id
    const recomendationId = request.params.recId
    const rating = request.body.rating
    const reviewerId = request.body.reviewerId
    const schema = {
        rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
        reviewerId:Joi.string().required()
    }
    const result = Joi.validate(request.body, schema)
    if (result.error) return response.status(400).send({ error: result.error.details[0].message })


    const course = await CourseRequest.findById(courseId)
    if (course) {
        const recomendation = course.recomendations.find(recomendation => recomendation._id==recomendationId)
        if(recomendation){
            var isExsit=false
            for( var reviewer of recomendation.reviewer)
           if (reviewer==reviewerId){
            isExsit=true
           }

            if(isExsit){
                response.status(404).send('Created review before')

            }else{
                if(recomendation.rating== undefined) recomendation.rating=0
                if(recomendation.numberOfRatings== undefined) recomendation.numberOfRatings=0
                if(((recomendation.rating*recomendation.numberOfRatings)+rating)/(recomendation.numberOfRatings+1)>5){
                recomendation.rating=5
                }else{
                recomendation.rating=((recomendation.rating*recomendation.numberOfRatings)+rating)/(recomendation.numberOfRatings+1)
            }
                recomendation.numberOfRatings=recomendation.numberOfRatings+1
                recomendation.reviewer.push(reviewerId)
                course.save()
                response.sendStatus(200)

            }
        }

    }
}catch(error){
    response.status(404).send(error)

}
>>>>>>> master
})


module.exports = router