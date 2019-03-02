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


module.exports = router;
