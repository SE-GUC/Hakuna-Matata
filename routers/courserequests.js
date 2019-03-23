// Dependencies
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');


// Models
const Courserequest  = require('../models/Courserequest.js');
const Recomendation = require('../models/recomendation.js');
const Notification = require('../models/Notification.js');

 //create course request

//1
router.post("/newCourseRequest",async (request,response, next) => {

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
           
          await  courserequest.save(function(err,room) {
              
                Notification.Send_CourseRequest_Notification(room.id,"HELPPPP MEEEE GUYSSS");
             });
            response.sendStatus(200);
          
        }
});

// get all course requests 
//1
router.get('/',async (request,response)=>{
    await Courserequest.find({},function(err,courserequests){
    if(!err){
        response.send(courserequests)
        }
        else {
         response.status(404).send("not found") 
        }
});
})
// get course request by id 
//1
router.get('/:id',async (request,response)=>{
    await Courserequest.findById(request.params.id,function(err,courserequests){
       if(!err){
       response.send(courserequests)
       }
       else {
        response.status(404).send("not found") 
       }
   })
    })
    
// delete a course request 
//1
router.delete('/delete/:id', async function(req,res){

    await Courserequest.findByIdAndRemove(
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
//give reco
//1
router.put('/:id/giverecomendation',async(req,res)=>{
    try{
       const id =req.params.id
          const schema={
        expert_id: Joi.number().required(),
        course_id:Joi.number().required()
     
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } 
        const cr= await Courserequest.findById(id);
        if(cr._id!==undefined){
            console.log(req.body)
            const reco = await Recomendation.create(req.body)
               


               
           cr.recomendations.push(reco);
            const temp= await cr.save();
            res.send(cr);    
            Notification.Send_CourseRecommendations_Notification(req.body.course_id,cr.applyingmember_id,"%od elcourse dah yalaaa");
         }
        else {
            res.status(404).send("Not found")
        }
    }
        catch(error) {
            // We will be handling the error later
            console.log(error)
        } 
        
    });
   
//update courserequest 
//1
router.put("/:id/update",async (req,res)=>{
    const schema={
     description:Joi.string(),
     categories:Joi.string(),
     active:Joi.boolean()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } 
 await   Courserequest.findById(req.params.id, function(err, courserequests) {
        if(!err){
            if(req.body.description!=null){
             courserequests.description=req.body.description
            }
            if(req.body.categories!=null){
                courserequests.categories=req.body.categories
               }
            if(req.body.active!=null){
                courserequests.active=req.body.active
               }


         const result=courserequests.save()
         res.send(courserequests); 
  
          }
          else{
            res.status(404).send('Not found');
  
          }  
         });
  
  });

module.exports = router;