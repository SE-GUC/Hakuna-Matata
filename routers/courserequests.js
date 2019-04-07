//1WT
// Dependencies
const express = require('express')
const router = express.Router()
var moment = require('moment')
const Joi = require('joi')


// Models
const CourseRequest  = require('../models/CourseRequest.js')
const courseRequestValidator = require('../validations/courseRequestValidations')

const Recomendation = require('../models/Recomendation.js')
const Notification = require('../models/Notification.js')
const {Member} = require('../models/Member.js')


 //create course request

//1
router.post("/",async (request,response) => {
    try{
    const isValidated = courseRequestValidator.createValidation(request.body)
    if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })    
    else {
           const courseRequest = new CourseRequest({
            description:request.body.description,
            applyingMemberId:request.body.applyingMemberId,
            categories:request.body.categories,
            recomendations:[]
           })
           
          await  courseRequest.save(function(err,room) {
              
                Notification.sendCourseRequestNotification(room.id,"HELPPPP MEEEE GUYSSS")
             })
            response.sendStatus(200)
          
        }
    }catch(err){
        console.log(err)
    }
})

// get all course requests 
//1
router.get('/',async (request,response)=>{
    await CourseRequest.find({},function(err,courseRequests){
    if(!err){
        response.send(courseRequests)
        }
        else {
         response.status(404).send("not found") 
        }
})
})
// get course request by id 
//1
router.get('/:id',async (request,response)=>{
    await CourseRequest.findById(request.params.id,function(err,courseRequest){
       if(!err){
       response.send(courseRequest)
       }
       else {
        response.status(404).send("not found") 
       }
   })
})
    
//update courserequest 
//1
router.put("/:id",async (req,res)=>{
    const isValidated = courseRequestValidator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })    
    else 
 await   CourseRequest.findById(req.params.id, function(err, courseRequests) {
        if(!err){
            if(req.body.description!=null){
             courseRequests.description=req.body.description
            }
            if(req.body.categories!=null){
                courseRequests.categories=req.body.categories
               }
            if(req.body.active!=null){
                courseRequests.active=req.body.active
               }


         const result=courseRequests.save()
         res.send(courseRequests) 
  
          }
          else{
            res.status(404).send('Not found')
  
          }  
         })
  
  })

// delete a course request 
router.delete('/:id', async function(req,res){

    try {
        const id = req.params.id
        const deleted = await CourseRequest.findOneAndRemove({"_id":id})
        if(deleted!==null)
        res.json({msg:'courserequest was deleted successfully', data: deleted})
        else
        res.json({msg:'courserequest was deleted Already or Not Found'})
    
       }
       catch(error) {
           // We will be handling the error later
           res.status(404).send('Not found')
       }
 
  })

//give reco
//1
router.put('/giveRecomendation/:id',async(req,res)=>{
    try{
       const id =req.params.id
          const schema={
        expertId: Joi.number().required(),
        courseId:Joi.number().required()
     
    }
    const result =Joi.validate(req.body,schema)
    if(result.error) return  res.status(400).send(result.error.details[0].message)
        
    
        const cr= await CourseRequest.findById(id)
        if(cr._id!==undefined){
            console.log(req.body)
            const reco = await Recomendation.create(req.body)
               
           cr.recomendations.push(reco)
            const temp= await cr.save()
            res.send(cr)    
            Notification.sendCourseRecommendationsNotification(req.body.courseId,cr.applyingMemberId,"%od elcourse dah yalaaa")
         }
        else {
            res.status(404).send("Not found")
        }
    }
        catch(error) {
            // We will be handling the error later
            res.status(404).send('Not found')
        } 
        
    })
   

// rating a recomendations
// (id  => courserequestsId,recId=> recomendationId)
router.put('/raterecomendation/:id/:recId',async(request,response)=>{
    const courseId=request.params.id
    const recomendationId= request.params.recId
    const rating= request.body.rating
    const schema={
       
        
        rating:Joi.number().valid(1,2,3,4,5).required(),
       
     }
     const result=Joi.validate(request.body,schema)
     if (result.error) return response.status(400).send({ error: result.error.details[0].message })
  
    
  const course=  await CourseRequest.findById(courseId)
  if(course !== undefined){
    const recomendations=course.recomendations
    for( var i = 0 ;i < recomendations.length; i++){ 
        if ( recomendations[i]._id == recomendationId) {
            recomendations.splice(i, 1) 
        }
     }

    const recomendation=await  Recomendation.findById(recomendationId)

    
    
    if(recomendation.numberOfRatings ===undefined){
    recomendation.numberOfRatings=0
}
    const NoOfRating=recomendation.numberOfRatings
    
    const newNoOfRating=NoOfRating+1
    if(recomendation.rating==undefined)
    recomendation.rating=0
    var temprate
    if(Math.round(((recomendation.rating*NoOfRating)+rating)/newNoOfRating)>5)
    temprate=5
    else
    temprate=Math.round(((recomendation.rating*NoOfRating)+rating)/newNoOfRating)
    recomendation.numberOfRatings=newNoOfRating
    recomendation.rating=temprate
     await Recomendation.findOneAndUpdate({"_id":recomendationId},recomendation)
    recomendations.push(recomendation)
try {    
    course =await CourseRequest.findOneAndUpdate({"_id":courseId},{"recomendations":recomendations})

    
} catch (error) {
    
}

    const id=recomendation.expertId

    var object =await Member.findOne({"_id":id})
     if(object !== undefined){
         nooftasks=object.allRatedReco

         const x=object.allRatedReco+1
         var temprate
         if(Math.round(((object.averageRecoRate*nooftasks)+Rating)/x)>5)
         temprate=5
         else
         temprate=Math.round(((object.averageRecoRate*nooftasks)+Rating)/x)
         object =await Member.findOneAndUpdate({"_id":id},{"allRatedReco":x,"averageRecoRate":temprate})
     }else{
        response.send("Not found")

     }

    response.sendStatus(200)


}else{
   response.send("Not found")

}
})


module.exports = router