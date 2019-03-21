const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');
const course=require('../models/courses.js');

// Models
const courses = require('../arrays/Courses');

// Get all course
router.get('/',(request,response)=>{

 response.send(courses);
});

// Get course by id
//(id  => courseId)
router.get('/:id/',(request,response)=>{
    const course_id=request.params.id;
    
    for(let object of courses){
        if(object.id==course_id){
         response.send(object);

    }}
  

   });
   
router.put('/:id/applyforacourse',(request,response)=>{
    const course_id=request.params.id;
    const member_id= request.body.member_id;
    const schema={
        member_id: Joi.number().required(), 
     }
     const result=Joi.validate(request.body,schema);
     if (result.error) return response.status(400).send({ error: result.error.details[0].message });

    for(let object of courses){
     if(object.id==course_id){
         object.listofapplies.push({member_id:member_id,dateofapply:moment().format('MMMM Do YYYY, h:mm:ss a')})

     }
 }
 response.sendStatus(200);
});

module.exports = router;