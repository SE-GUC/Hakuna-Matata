const express = require('express')
const router = express.Router();
const Joi = require('joi');
const {Notification,NotSummary,sendToUserRequestNotification}= require('../../models/Notification.js');
const User= require('../../models/User.js');

//get all notifications   
//1
router.get('/',async (request,response)=>{
    const notifications = await Notification.find()
    response.json({data: notifications})
}) 


// get notifications by id
router.get('/:id/',async (request,response)=>{
    await Notification.findById(request.params.id,function(err,noti){
       if (!err) {
       response.send(noti)
       }else {
          response.status(404).send('not found') 
       }
    })
})

// get all notif sum
router.get('/NotSummary',async (request,response)=>{
    const notSummaries = await NotSummary.find()
    response.json({data: notSummaries})
}) 

// get notif summ by id 
router.get('/NotSummary/:id',async (request,response)=>{
    const notSummary = await NotSummary.findById(request.params.id)
    response.json({data: notSummary})

})

// delete notification by id
router.delete('/:id', async function(req,res){

      await  Notification.findByIdAndRemove(
            req.params.id,
            function(err) {
              if(!err){
                res.sendStatus(200);
                NotSummary.remove({'notParentId':req.params.id}, function(err, result){
                })
              } else {
                res.status(404).send('Not found')
              }
            })
 })
    
    

// delete not summary by id
router.delete('/NotSummary/:id',async function(req,res){

     await  NotSummary.findByIdAndRemove(
            req.params.id,
            function(err) {
              if(!err){
                res.sendStatus(200);
              } else {
                res.status(404).send('Not found')
              }
            })   
})
    

// delete all not summary
router.delete('/NotSummary/Remove',async function(req,res){

    await  NotSummary.remove()
})
// show admin notifications for editing profile requests
router.get('/get/admin',async (request,response)=>{

    var newaray=[];
    const notificationSummaries=await NotSummary.find()
    for (const object of notificationSummaries) {
        if (object.sentTo=='admin') {
            newaray.push(object);
        }
    }
    response.send(newaray);
});


// get notification summary for specific member 
router.get('/member/:id',async(request,response)=>{
    
    var newArray=[];
    const notificationSummaries=await NotSummary.find()
    for (const object of notificationSummaries){
        if (!object.expert_requires){  
            if (object.sentTO==request.params.id){
                newArray.push(object);
            }
        } else {
            if (object.expert_requires){
            const members= await User.find({tags:'Member'})
                for (const object2 of members){
                    if (object2._id==request.params.id) {
                        if (object2.levelOfExperience>=4) {
                            newArray.push(object); 
                        } 
                    }
                }
            }
        }
    }
    response.send(newArray)
})



// for admin to approve user by id he got in the title of the request
//1
router.post('/approveUser',(request,response)=>{ 

    var userId=request.body.userId;
    var approved=request.body.approved;
    const schema={
        userId: Joi.number().required(),
        approved: Joi.boolean().required()
    
    };
    const result=Joi.validate(request.body,schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });
    if (approved){
        var e = sendToUserRequestNotification ('You have been approved to edit', userId);
    } else {
        var e = sendToUserRequestNotification ('You have been disapproved to edit', userId);
    }
    response.sendStatus(200);
});

module.exports = router;




