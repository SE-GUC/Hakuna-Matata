

// Dependencies
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');


// Models
const Courserequest = require('../models/Courserequest.js');
const Notification = require('../models/Notification.js');

 //create course request


router.post("/newCourseRequest",(request,response, next) => {

    const Joi = require('joi');
    const schema = Joi.object().keys({
        description:Joi.string(),
        categories:Joi.string(),
        applyingmember_id:Joi.string()
    });

   const result= Joi.validate(request.body,schema); 

        if (result.error) {
           return response.status(400).send({error:result.error.details[0].message})
        } else {
           const courserequest = new Courserequest({
            description:request.body.description,
            applyingmember_id:request.body.applyingmember_id,
            categories:request.body.categories,
            recomendations:[]
           });
           
            courserequest.save(function(err,room) {
              
                Notification.Send_CourseRequest_Notification(room.id,"HELPPPP MEEEE GUYSSS");
             });
            response.sendStatus(200);
          
        }
});

// get all course requests 
router.get('/',(request,response)=>{
Courserequest.find({},function(err,courserequests){
    if(!err){
        response.send(courserequests)
        }
        else {
         response.status(404).send("not found") 
        }
});
})

// get course request by id 
router.get('/:id',(request,response)=>{
   Courserequest.findById(request.params.id,function(err,courserequests){
       if(!err){
       response.send(courserequests)
       }
       else {
        response.status(404).send("not found") 
       }
   })
    })
    
// delete a course request 
router.delete('/delete/:id', function(req,res){

    Courserequest.findByIdAndRemove(
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

/*
// as an expert i can give a recomendation
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
  */
 /* 
//rating a recomendations
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
*/

      

     module.exports = router;