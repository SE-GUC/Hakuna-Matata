//1WT
// Dependencies
const express = require('express')
const router = express.Router()
var moment = require('moment')
const Joi = require('joi')


// Models
const CourseRequest = require('../models/CourseRequest.js')
const courseRequestValidator = require('../validations/courseRequestValidations')

const Notification = require('../models/Notification.js')
const { User } = require('../models/User.js')


//get all courseRequest
router.get('/', async (req,res) => {
    const courseRequests = await CourseRequest.find()
    res.json({data: courseRequests})
})

//get Certin courseRequest
router.get('/:id', async (req,res) => {
    const id = req.params.id
    const courseRequest = await CourseRequest.findOne({"id":id})
    res.json({msg:'get the courseRequest successfully', data: courseRequest})

})

// Create a courseRequest
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
     const courseRequest = await CourseRequest.findOne({"id":id})
     if(!courseRequest) return res.status(404).send({error: 'Amdin does not exist'})
     const isValidated = courseRequestValidator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const uCourseRequest = await CourseRequest.updateOne({"id":id},req.body)
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
     const deleteCourseRequest = await CourseRequest.findOneAndRemove({"id": id})
     res.json({msg:'CourseRequest was deleted successfully', data: deleteCourseRequest})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

//give reco
//1
router.put('/giveRecomendation/:id', async (req, res) => {
    try {
        const id = req.params.id
        const expertId=req.body.expertId
        const schema = {
            content: Joi.string().required(),
        }
        const result = Joi.validate(req.body, schema)
        const schema1 = {
            masterClass: Joi.object().required(),
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
            Notification.sendCourseRecommendationsNotification(req.body.courseId, cr.applyingMemberId, "%od elcourse dah yalaaa")
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
            Notification.sendCourseRecommendationsNotification(req.body.courseId, cr.applyingMemberId, "%od elcourse dah yalaaa")
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
                masterClass:req.body.masterClass,
            })
            Notification.sendCourseRecommendationsNotification(req.body.courseId, cr.applyingMemberId, "%od elcourse dah yalaaa")
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
        res.status(404).send('Not found')
    }

})






// // rating a recomendations
// // (id  => courserequestsId,recId=> recomendationId)
// router.put('/raterecomendation/:id/:recId', async (request, response) => {
//     const courseId = request.params.id
//     const recomendationId = request.params.recId
//     const rating = request.body.rating
//     const schema = {


//         rating: Joi.number().valid(1, 2, 3, 4, 5).required(),

//     }
//     const result = Joi.validate(request.body, schema)
//     if (result.error) return response.status(400).send({ error: result.error.details[0].message })


//     const course = await CourseRequest.findById(courseId)
//     if (course !== undefined) {
//         const recomendations = course.recomendations
//         for (var i = 0; i < recomendations.length; i++) {
//             if (recomendations[i]._id == recomendationId) {
//                 recomendations.splice(i, 1)
//             }
//         }

//         const recomendation = await Recomendation.findById(recomendationId)



//         if (recomendation.numberOfRatings === undefined) {
//             recomendation.numberOfRatings = 0
//         }
//         const NoOfRating = recomendation.numberOfRatings

//         const newNoOfRating = NoOfRating + 1
//         if (recomendation.rating == undefined)
//             recomendation.rating = 0
//         var temprate
//         if (Math.round(((recomendation.rating * NoOfRating) + rating) / newNoOfRating) > 5)
//             temprate = 5
//         else
//             temprate = Math.round(((recomendation.rating * NoOfRating) + rating) / newNoOfRating)
//         recomendation.numberOfRatings = newNoOfRating
//         recomendation.rating = temprate
//         await Recomendation.findOneAndUpdate({ "_id": recomendationId }, recomendation)
//         recomendations.push(recomendation)
//         try {
//             course = await CourseRequest.findOneAndUpdate({ "_id": courseId }, { "recomendations": recomendations })


//         } catch (error) {

//         }

//         const id = recomendation.expertId

//         var object = await Member.findOne({ "_id": id })
//         if (object !== undefined) {
//             nooftasks = object.allRatedReco

//             const x = object.allRatedReco + 1
//             var temprate
//             if (Math.round(((object.averageRecoRate * nooftasks) + Rating) / x) > 5)
//                 temprate = 5
//             else
//                 temprate = Math.round(((object.averageRecoRate * nooftasks) + Rating) / x)
//             object = await Member.findOneAndUpdate({ "_id": id }, { "allRatedReco": x, "averageRecoRate": temprate })
//         } else {
//             response.send("Not found")

//         }

//         response.sendStatus(200)


//     } else {
//         response.send("Not found")

//     }
// })


module.exports = router