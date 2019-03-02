const express = require('express');
const router = express.Router();
const Joi = require('joi');

const task = require('../models/task.js'); 

const taskConsulted = require('../arrays/taskConsulted.js'); 
const tasks= require('../arrays/tasks.js');
const platform= require('../arrays/platform.js');
const members= require('../arrays/members.js');
const {Send_Task_Notification} = require("../arrays/Notifications.js");



router.put('/:id/updateworkcycle',(request,response)=>{
    
    const taskid=request.params.id;
    const newworkcycle = request.body.work_cycle;
    var memberid =0;
    const schema={
      
       work_cycle: Joi.number().valid(25,50,75,100).required(),
      
    }
    const result=Joi.validate(request.body,schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });
 for(let object of tasks){
     if(object.id==taskid){
         object.work_cycle=newworkcycle
        memberid= object.member_id}
       
 
 }
     if(newworkcycle==100){
        for(let object2 of members){
            if(object2.id==memberid){
                object2.completed_task_id.push({id:parseInt(taskid)});
            }
        }

    }
