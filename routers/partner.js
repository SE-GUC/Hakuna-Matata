const express = require('express')
const router = express.Router()
const Joi = require('joi');
const Partner = require('../models/partner')
//create a partner
router.post('/create',(request,response)=>{
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
        
        partner.save();
        response.sendStatus(200);
        
}})
//delete partner
router.delete('/:id/deletepartner', function(req,res){

    Partner.findByIdAndRemove(
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

//get all partners
router.get('/', (req, res) =>{
   Partner.find({}, function(err, partners) {
          
        if(!err){
            res.send(partners);

          }
          else{
            res.status(404).send('Not found');

          }
      });

});
//get partner by id
router.get('/:id',(req,res)=>{

    Partner.findById(req.params.id, function(err, partners) {
        if(!err){
            res.send(partners);

          }
          else{
            res.status(404).send('Not found');

          }  
         });
   
   
   })
//update a partner
router.put("/:id/update",(req,res)=>{
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
    Partner.findById(req.params.id, function(err, partners) {
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
         const result=partners.save()
         res.send(partners); 

          }
          else{
            res.status(404).send('Not found');

          }  
         });

});
/*
router.get('/:id/show_accpted_task_notify',(request,response)=>{
    const not = notificationSummaries.find({sent_to:request.params.id,title:"Your task has been accepted"});
    response.send(not);
});
router.get('/:id/show_assigned_task_notify',(request,response)=>{
    const not = notificationSummaries.find({sent_to : request.params.id,title:"You task has been assigned to a member!"});
   
    response.send(not);
});
*/

/*const express = require('express')
const router = express.Router()
const Joi = require('joi');


// We will be connecting using database 
const partner = require('../models/partner')
const notObject = require("../arrays/Notifications.js");
const projects=require('../arrays/projects')
// temporary data created as if it was pulled out of the database ...
const  partners = require('../arrays/partners')

const {notificationSummaries} = require("../arrays/Notifications.js");



//show my project (id =>partnerId)
router.get('/:id/show_projects',(req,res)=>{
    projects.forEach(element => {
        if(element.partner_id===parseInt(req.params.partner_id)){
            res.write(JSON.stringify(element));
        }
    });
    res.end();
});

// Get all partner
router.get('/adminpartner', (req, res) => {
    res.send(partners)
})


// Get a certain partner (id =>partnerId)
router.get('/:id/adminpartner', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})



// Delete Certine partner from Array (id =>partnerId)
router.delete('/:id/deletepartner/adminpartner', (req, res) => {
    const partnerId = req.params.id
    //router.listen( () => console.log(partnerId))
    const partner = partners.find(partner=> partner.id === partnerId)
    partners.splice(partners.indexOf(partner),1)
})



router.get('/:id/show_accpted_task_notify',(request,response)=>{
    const not = notificationSummaries.find(not=> not.sent_to === parseInt(request.params.id)&&not.title==="Your task has been accepted");
   
    response.send(not);
});
router.get('/:id/show_assigned_task_notify',(request,response)=>{
    const not = notificationSummaries.find(not=> not.sent_to === parseInt(request.params.id)&&not.title==="You task has been assigned to a member!");
   
    response.send(not);
});

*/

/*marina show profile */
// Get a certain partner (id =>partnerId)
/*
router.get('/:id', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})


router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= notObject.SendToAdminRequestNotification("Partner "+id+" wants to edit his profile");
    response.sendStatus(200);
});*/
module.exports=router;