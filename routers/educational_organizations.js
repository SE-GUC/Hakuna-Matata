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



module.exports = router



