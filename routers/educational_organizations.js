//creation of educational organization
//create master class
//create courses
//create training programs
//create certificates
//add info about educators and trainers
const express = require('express');
const router = express.Router();
router.use(express.json());
const Joi = require('joi');

const educational_organization = require('../models/educational_organization.js');
const master_class=require('../models/master_class.js');
const courses=require('../models/courses.js');
const training_programs=require('../models/training_programs.js');
const certificates=require('../models/certificates.js');
const educators=require('../models/educators.js');

const educational_organizations = require('../arrays/educational_organizations.js');




//delete educational_organization,course,certificate,educator,master_class,training_programs (id  => educational_organizationId)
router.delete("/:id/delete_educational_organization",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    educational_organizations.splice(education);
   

    res.send({data:educational_organizations});
    
}); 
//reserve workshop for course  
router.put('/:id/accept_reservation/:room_id',(req,res)=>{
 
    const schema={
        reserved:Joi.boolean(),
        reserved_date:Joi.string(),
        end_of_reservation:Joi.string(),
        reserved_id: Joi.number().integer()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
   
    const co = coworking_spaces.find(m=>m.id===parseInt(req.params.id));
    const roooms = co.rooms;
    const room = roooms.find(m=>m.id===parseInt(req.params.room_id));
    if(room.reserved===false){
      room.reserved_id = req.body.reserved_id;
        room.reserved=req.body.reserved;
        room.reserved_date=req.body.reserved_date;
        room.end_of_reservation=req.body.end_of_reservation;
        res.send(room);
        return;
    };

    res.send("this room is not available");
})



module.exports = router



