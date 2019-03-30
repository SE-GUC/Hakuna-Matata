const express = require('express')
const router = express.Router();
const Joi = require('joi');
const {Notification,Not_summary}= require('../models/Notification.js');
const Member= require('../models/member.js');
const {SendToUserRequestNotification}= require('../models/Notification.js');


//get all notifications   
//1
router.get('/',async (request,response)=>{
    const notifications = await Notification.find()
    response.json({data: notifications})
}) 
//get notifications by id
//1
router.get('/:id/Notification',async (request,response)=>{
    const notification = await Notification.findById(request.params.id)
    response.json({data: notification})
     })

//get all notif sum
//1
router.get('/Not_summary',async (request,response)=>{
    const not_summarys = await Not_summary.find()
    response.json({data: not_summarys})
     }) 
//get notif summ by id 
//1
router.get('/Not_summary/:id',async (request,response)=>{
    const not_summary = await Not_summary.findById(request.params.id)
    response.json({data: not_summary})

     })

     //delete notification by id
     //1
router.delete('/delete/:id', async function(req,res){

      await  Notification.findByIdAndRemove(
            req.params.id,
            function(err) {
              if(!err){
                res.sendStatus(200);
                Not_summary.remove({"not_parent_id":req.params.id}, function(err, result){
 });
    
              }
              else{
                res.status(404).send('Not found');
    
              }
            }
        );
     
 });
    
    

//delete not summary by id
//1
router.delete('/delete//Not_summary/:id',async function(req,res){

     await  Not_summary.findByIdAndRemove(
            req.params.id,
            function(err) {
              if(!err){
                res.sendStatus(200);
    
              }
              else{
                res.status(404).send('Not found');
    
              }
            }
        );
     
});
    
    
//badr 
//show admin notifications for editing profile requests
//1
router.get('/admin',async (request,response)=>{
    var newaray=[];
    const notificationSummaries=await Not_summary.find()
    for (const object of notificationSummaries){
        if(object.sent_to=="admin"){
          
            newaray.push(object);
        }
    }
    response.send(newaray);
    
    });



// get notification summary
//1,2
router.get('/:id/Not_summary',async(request,response)=>{
var newArray=[];
const notificationSummaries=await Not_summary.find()
for (const object of notificationSummaries){
if (!object.expert_requires){  
    if (object.sent_to==request.params.id){
        newArray.push(object);
}
}
else{
    if (object.expert_requires){
     const members= await Member.find()
        for (const object2 of members){
            if(object2._id==request.params.id){
              
               if(object2.levelofexpreience>=4){
                newArray.push(object); 
               }
                
            }
      }}
        
        }
    }
response.send(newArray)
});



// for admin to approve user by id he got in the title of the request
//1
router.post('/approveUser',(request,response)=>{
var user_id=request.body.user_id;
var approved=request.body.approved;
const schema={
    user_id: Joi.number().required(),
    approved: Joi.boolean().required()
   
 };
 const result=Joi.validate(request.body,schema);
 if (result.error) return response.status(400).send({ error: result.error.details[0].message });
if (approved){
    var e=SendToUserRequestNotification("You have been approved to edit",user_id);
}
else{
    var e=SendToUserRequestNotification("You have been disapproved to edit",user_id);
}
response.sendStatus(200);


});


//end badr

/*
// show notifications for specific member
router.get('/', (request,response)=>{
const not_id=request.query.notification_id;
for (const object of notifications){
    if(object.notification_id==not_id){
        response.send(object);
        return;
    }
}

});
*/

/*
//function to get level of experience of member
function getexplevel(id) {
    for (const object of members){
        if(object.member_id==id){
           
            return object.levelofexpreience;
        }
  }}


*/

module.exports = router;




