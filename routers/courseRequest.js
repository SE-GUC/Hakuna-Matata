// Dependencies
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');


// Models
const coursemodel = require('../models/Courserequest.js');

const notObject = require("../arrays/Notifications.js");
const courserequests = require('../arrays/Courserequests.js');
var members = require('../arrays/members.js');
// Get all course
router.get('/',(request,response)=>{

 response.send(courserequests);
});


/////////i can communicate for expert to get recomendation for master class /////////

/*communicate with expert to get reco nada */
router.post("/newCourseRequest",(request,response)=>{
    id=courserequests.length+1;
    description=request.body.description;
    dateofsubmission=moment().format("MMMM Do YYYY, h:mm:ss a");
    applyingmember_id=request.body.applyingmember_id;
    categories=null;
    recomendations=[];
    active=true;
    courserequests.push(new coursemodel(id, description, dateofsubmission, applyingmember_id, categories, recomendations, active));
    var e=notObject.Send_CourseRequest_Notification(id,"HELPPPP MEEEE GUYSSS");
    response.send(courserequests);

});

     /*******as an expert i can give recomendation to other members******/
     
// as an expert i can give a recomendation nada
//(id  => courserequestsId)
router.put('/:id/giverecomendation',(request,response)=>{
    const request_id=request.params.id;
    const expert_id= request.body.expert_id;
    const course_id= request.body.course_id;
    var recomendation_id ;
    const schema={
       
        expert_id: Joi.number().required(),
        course_id:Joi.number().required(),
       
     }
     const result=Joi.validate(request.body,schema);
     if (result.error) return response.status(400).send({ error: result.error.details[0].message });


 for(let object of courserequests){
     if(object.id==request_id){
        

         object.recomendations.push({recomendationid:object.recomendations.length+1,expert_id:expert_id,course_id:course_id,rating:0,numberofratings
        :0});

        var e=notObject.Send_CourseRecommendations_Notification(course_id,object.applyingmember_id,"%od elcourse dah yalaaa");

     }
 }


 response.sendStatus(200);
});
   
//rating a recomendations nada//////////////////
//(id  => courserequestsId,recId=> recomendationId)
router.put('/:id/raterecomendation/:recId',(request,response)=>{
    const request_id=request.params.id;
    const recomendation_id= request.params.recId;
    const Rating= request.body.Rating;
    const schema={
       
        
        Rating:Joi.number().valid(1,2,3,4,5).required(),
       
     }
     const result=Joi.validate(request.body,schema);
     if (result.error) return response.status(400).send({ error: result.error.details[0].message });
  
    

 for(let object of courserequests){
     if(object.id==request_id){
       
         for(let recomendation of object.recomendations){
          
             if(recomendation.recomendationid==recomendation_id){
               
                 var memberid= recomendation.expert_id;
                var oldnumberratig =recomendation.numberofratings;
                recomendation.numberofratings=recomendation.numberofratings+1;
                var oldrating = recomendation.rating;
                 recomendation.rating=Math.floor(((oldrating*oldnumberratig)+Rating)/recomendation.numberofratings);

                 

             }
         }
     }
 }
 for(let object2 of members){
     if(object2.id==memberid){
         object2.avreage_reco_rate=Math.floor(((object2.avreage_reco_rate*object2.all_rated_reco)+Rating)/(object2.all_rated_reco+1));
         object2.all_rated_reco++;
     }

 }
 response.sendStatus(200);
}); 