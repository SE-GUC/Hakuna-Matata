const express = require('express')
const router = express.Router()
const Joi = require('joi');
const Partner = require('../models/partner')
const Project = require('../models/project')
const {SendToAdminRequestNotification,Not_summary}= require('../models/Notification.js');
//create a partner
//1
router.post('/create',async (request,response)=>{
    const name=request.body.name;
    const information= request.body.information;
    const partners= request.body.partners;
    const field_of_work=request.body.field_of_work;
    const projects= request.body.projects;
    const feedback=request.body.feedback;
    const schema={
        name:Joi.string().required(),
        information:Joi.string().required(),
        partners:Joi.array().items(Joi.string()).required(),
        field_of_work:Joi.string().required(),
        projects:Joi.array().items(Joi.string()).required(),
        feedback:Joi.string().required()
     }
     const result=Joi.validate(request.body,schema);
     if (result.error) return response.status(400).send({ error: result.error.details[0].message });
     else {
        const partner = new Partner ({
            name:name,
            information:information,
            partners:partners,
            field_of_work:field_of_work,
            projects:projects,
            feedback:feedback
        });
        
        await partner.save();
        response.sendStatus(200);
        
}})
//delete partner
//1
router.delete('/:id/deletepartner', async  function(req,res){
    try {
        const id = req.params.id
        const deletedPartner = await Partner.findOneAndRemove({"_id":id})
        if(deletedPartner!==null)
        res.json({msg:'Partner was deleted successfully', data: deletedPartner})
        else
        res.json({msg:'Partner was deleted Already or Not Found'})
    
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }
 
  });

//get all partners
//1
router.get('/', async (req, res) =>{
  await Partner.find({}, function(err, partners) {
          
        if(!err){
            res.send(partners);

          }
          else{
            res.status(404).send('Not found');

          }
      });

});
//get partner by id
//1
router.get('/:id',async (req,res)=>{

    await Partner.findById(req.params.id, function(err, partners) {
        if(!err){
            res.send(partners);

          }
          else{
            res.status(404).send('Not found');

          }  
         });
   
   
   })
//update a partner
//1
router.put("/:id/update",async (req,res)=>{
    const schema={
        name:Joi.string(),
        information:Joi.string(),
        partners:Joi.array().items(Joi.string()),
        field_of_work:Joi.string(),
        projects:Joi.array().items(Joi.string()),
        feedback:Joi.string()
   

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } 
   await Partner.findById(req.params.id, function(err, partners) {
        if(!err){
            if(req.body.name!=null){
             partners.name=req.body.name
            }if(req.body.information!=null){
            partners.information=req.body.information
         }if(req.body.partners!=null){
            partners.partners=req.body.partners
         
         }if(req.body.field_of_work!=null){
         
          partners.field_of_work=req.body.field_of_work
        }if(req.body.projects!=null){
            partners.projects=req.body.projects
          
         }if(req.body.feedback_form!=null){
            partners.feedback_form=req.body.feedback_form
           
         }
         const result= partners.save()
         res.send(partners); 

          }
          else{
            res.status(404).send('Not found');

          }  
         });

});


// get partner project
//1
router.get('/:id/projects',async (req,res)=>{
  //  var temp=[];
   await Partner.findOne({"_id":req.params.id}, function(err, tPartner) {
              
        if(!err){
            //console.log
            if(tPartner!==null)
            res.send(tPartner.projects);
            else
            res.send("Not Found")
    
          }
          else{
            res.status(404).send('Not found');
    
          }
      });
       
})
//badr
//1
router.get('/:id/show_accpted_task_notify',async (request,response)=>{
    const not = await Not_summary.find({"sent_to":request.params.id,"title":"Your task has been accepted"});
    response.send({data:not});
});
//1
router.get('/:id/show_assigned_task_notify',async (request,response)=>{
    const not =await Not_summary.find({"sent_to" : request.params.id,"title":"You task has been assigned to a member!"});
    response.send({data:not});
});
//1
router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= SendToAdminRequestNotification("Partner "+id+" wants to edit his profile");
    response.sendStatus(200);
});

//show my project (id =>partnerId)
//1
router.get('/:id/show_projects',async(req,res)=>{
    const projects=await Project.find({"partner_id":req.params.id})
    if(projects.length==0)
    res.send("You don't have projects")
    else
    res.send({data:projects})
});
//end badr





module.exports=router;