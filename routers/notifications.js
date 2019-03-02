const express = require('express');
const router = express.Router();

const Joi = require('joi');


const members = require("../arrays/members.js");
const {notifications,notificationSummaries,SendToUserRequestNotification} = require("../arrays/Notifications.js");




//function to get level of experience of member
function getexplevel(id) {
    for (const object of members){
        if(object.member_id==id){
           
            return object.levelofexpreience;
        }
  }}


//show admin notifications for editing profile requests
router.get('/admin', (request,response)=>{
    var newaray=[];
    for (const object of notificationSummaries){
        if(object.sent_to=="admin"){
          
            newaray.push(object);
        }
    }
    response.send(newaray);
    
    });

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



// get notification summary
router.get('/:id/Not_summary',(request,response)=>{
var newArray=[];
for (const object of notificationSummaries){
if (!object.expert_requires){  
    if (object.sent_to==request.params.id){
    newArray.push(object);
}}
else{
    if (object.expert_requires){
     
        for (const object2 of members){
            if(object2.id==request.params.id){
              
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

module.exports = router;
