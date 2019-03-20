const express = require('express')
const router = express.Router()
const Joi = require('joi');


// We will be connecting using database 
const partner = require('../models/partner')
const notObject = require("../arrays/Notifications.js");
const projects=require('../arrays/projects')
// temporary data created as if it was pulled out of the database ...
const  partners = require('../arrays/partners')

const {notificationSummaries} = require("../arrays/Notifications.js");

// create a partner
router.post('/create',(req,res)=>{
   
    const schema={
        name:Joi.string().required(),
        information:Joi.string().required(),
       partners:Joi.array().required(),
       field_of_work:Joi.string().required(),
       projects:Joi.array().required(),
       feedback_form:Joi.string().required()

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const par = new partner(
        partners.length+1,
        
        req.body.name,
        req.body.information,
        req.body.partners,
        req.body.field_of_work,
        req.body.projects,
        req.body.feedback_form
        
    );
    partners.push(par);
    var flag = false;
    par.partners.forEach(ele => {
        const element = partners.find(pl=> pl.id === ele)
   if(element===undefined){
       res.send("Unfound partner");
       return;
   }
        element.partners.forEach(element2 => {
        
        if(element2===par.id){
            flag=true;
        }
    })
    if(!flag){
        element.partners.push(par.id)
    }
})
    res.send({data:partners});
    
});
//update a partner
router.put("/:id/update",(req,res)=>{
    const schema={
        name:Joi.string().required(),
        information:Joi.string().required(),
       partners:Joi.array().required(),
       field_of_work:Joi.string().required(),
       projects:Joi.array().required(),
       feedback_form:Joi.string().required()
   

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const par =partners.find(m=>m.id===parseInt(req.params.id));    
 if(req.body.name!=null){
       par.name=req.body.name;
   }if(req.body.information!=null){
    par.information=req.body.information;
}if(req.body.partners!=null){
    par.partners=req.body.partners;
}if(req.body.field_of_work!=null){
    par.field_of_work=req.body.field_of_work;
}if(req.body.projects!=null){
    par.projects=req.body.projects;
}if(req.body.feedback_form!=null){
    par.feedback_form=req.body.feedback_form;
}
res.send({data:partners});

});


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


// Get all partner
router.get('/', (req, res) => {
    res.send(partners)
})


// Get a certain partner (id =>partnerId)
router.get('/:id', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})



// Delete Certine partner from Array (id =>partnerId)
router.delete('/:id/deletepartner', (req, res) => {
    const partnerId = req.params.id
    //router.listen( () => console.log(partnerId))
    const partner = partners.find(partner=> partner.id === partnerId)
    partners.splice(partners.indexOf(partner),1)
})


// Get all partner
router.get('/', (req, res) => {
    res.send(partners)
})

/*marina show profile */
// Get a certain partner (id =>partnerId)
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
});
module.exports=router;