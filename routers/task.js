const express = require('express');
const router = express.Router();
const Joi = require('joi');

const task = require('../models/task.js'); 

const taskConsulted = require('../arrays/taskConsulted.js'); 
const tasks= require('../arrays/tasks.js');
const platform= require('../arrays/platform.js');
const members= require('../arrays/members.js');
const {Send_Task_Notification} = require("../arrays/Notifications.js");

//create task
router.post('/create/:id',(req,res)=>{
    
    const schema={
        description:Joi.string().required(),
        consult_needed:Joi.boolean(),
        time:Joi.string(),
	    level_of_commitment:Joi.number().integer().min(1).max(5),
	    experiance_level:Joi.number().integer().min(1).max(5),
        monetory_compensation:Joi.number(),
        required_skills:Joi.array(),
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
if (req.body.consult_needed===false){

    const schema={
        description:Joi.string().required(),
        consult_needed:false,
	    time:Joi.string().required(),
	    level_of_commitment:Joi.number().integer().min(1).max(5).required(),
	    experiance_level:Joi.number().integer().min(1).max(5).required(),
        monetory_compensation:Joi.number().required(),
        required_skills:Joi.array().required(),

    };

    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    tasks.push(  
        new task(tasks.length+1,parseInt(req.params.id),0,0,0,
                 [{Memeber_id:null , date_of_apply:null}
                    ],
                req.body.description,req.body.required_skills,req.body.monetory_compensation,
                req.body.time,null,null,null,req.body.experiance_level,req.body.level_of_commitment,
                null,null,null,null,null,false,[]
                )

                );
res.send({data : tasks});
return;
}
taskConsulted.push(  
    new task(tasks.length+1,parseInt(req.params.id),0,0,0,
             [{Memeber_id:null , date_of_apply:null}
                ],
            req.body.description,req.body.required_skills,req.body.monetory_compensation,
            req.body.time,null,null,null,req.body.experiance_level,req.body.level_of_commitment,
            null,null,null,null,null,false,[]
            ));

res.send(taskConsulted);
}
);

// Update a tasks's state (taskID =>taskId , adminId=> admin who reject or accept the task)
router.put('/:adminId/edit/:taskID', (req, res) => {
    const admin_Id=req.params.adminId
    const task_Id = req.params.taskID 
    const acceptancy = req.body.state
    const vartask = tasks.find(vartask => parseInt(vartask.id) === parseInt(task_Id))
    //console.log(vartask)
    if(vartask!== undefined){
        vartask.accepted = acceptancy
        if(vartask.accepted===true){       
            const  task1=new task(  vartask.id,vartask.partner_id,vartask.consultancy_agency_id,vartask.member_id,admin_Id,
                                    vartask.applied_id,vartask.description,vartask.required_skills,
                                    vartask.monetary_compensation,vartask.deadline,vartask.deadline_for_apply,
                                    vartask.upload_date,vartask.submission_date,vartask.experience_level,
                                    vartask.commit_level, vartask.work_cycle,vartask.link_of_task,vartask.user_rate,
                                    vartask.accepted,vartask.rate,vartask.consulty_needed,vartask.consulty_members)
            tasks.splice(tasks.indexOf(vartask),1)
            platform.push(task1.id)
            tasks.push(task1)
            var e=Send_Task_Notification(task_Id,vartask.partner_id,"Your task has been accepted");
        }
        else{
            var e=Send_Task_Notification(task_Id,vartask.partner_id,"Your task has been rejected");
            tasks.splice(tasks.indexOf(vartask),1)
        }
         res.send(tasks)

    }
    else{
        res.send('there is not such task') 
    }
    
})

// get a specific task      (id =>taskId)
router.get("/:id" ,(req,res)=>{
    const task =tasks.find(m=>m.id===parseInt(req.params.id));
    res.send(task)
});

//show all tasks
router.get("/",(req,res)=>{
    res.send(tasks);
});




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
     
   
    response.send(tasks);
    
});

// Delete Certine task from Array
router.delete('/:id/deletetask', (req, res) => {
    const taskId = req.params.id
    //router.listen( () => console.log(memberId))
    const task = tasks.find(task=>parseInt( task.id)=== parseInt(taskId))
    if(task!==undefined){
    tasks.splice(tasks.indexOf(task),1)
    platform.splice(platform.indexOf(taskId),1)
    res.send('Done')}
    else{
        res.send('this id is not on the System')
    }
})


module.exports = router
