const express = require('express');
const router = express.Router();
const Joi = require('joi');

const task = require('../models/task.js'); 

const taskConsulted = require('../arrays/taskConsulted.js'); 
const tasks= require('../arrays/tasks.js');
const platform= require('../arrays/platform.js');
const members= require('../arrays/members.js');
const {Send_Task_Notification} = require("../arrays/Notifications.js");



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
// Assignig a member to a certain task (id =>taskId , memberId=> member who will be assigned to a task)
router.put('/:id/assTask/:memberId', (req, res) => {
    const task_Id = req.params.id 
    const member_Id=req.params.memberId
    const task = tasks.find(task => parseInt(task.id) ===parseInt( task_Id))
  
if (task.applied_id==null){
    res.status(400);
res.send('No members applied yet');
}
else{

    if(task.accepted===true&&(task.member_id===null||task.member_id.length===0)){
        const appliedtoit=task.applied_id
        const check=appliedtoit.find(check=>check===parseInt(member_Id))
        if(check!==undefined){
            const member = members.find(member => parseInt(member.id) ===parseInt( member_Id))
            if(member!== undefined){
                task.work_cycle=0
               // member.appliedtask.push(task_Id)
                task.member_id=member_Id
                platform.splice(platform.indexOf(task_Id),1)
                res.send(task)
                var e=Send_Task_Notification(task_Id,member_Id,"You have been assigned!");
                var e=Send_Task_Notification(task_Id,task.partner_id,"You task has been assigned to a member!");

            }
            else{
                res.send("This member is Deleted")
            }
            
        }
         else
            res.send("This member not one of the applied members")


    }else{
        if(task.accepted!==true)
            res.send("This Task not accepted")
        else
        res.send("This Task is already assigned to a member ")
    }

}
}
)

// Assignig a member to a certain task (id =>taskId , memberId=> member who will be assigned to a task)
router.put('/:id/forceAssTask/:memberId', (req, res) => {
    const task_Id = req.params.id 
    const member_Id=req.params.memberId
    const task = tasks.find(task => task.id === task_Id)
    if(task.accepted&&task.member_id.length==0){
            const member = members.find(member => member.id === member_Id)
            if(member!== undefined){
                member.appliedtask.push(task_Id)
                task.member_id=member_Id
                res.send(task)
            }
            else{
                res.send("This member is Deleted")
            }
    }
})
//View task Cycle (id =>taskId )
router.get('/:id/viewCycle', (req, res) => {
    const task =tasks.find(task=>task.id===parseInt(req.params.id));
    if(task !==undefined)
    res.send(task.workcycle)
    else{
        res.send('This task not Found !')
    }

})
// Get a All member of specific task
router.get('/:id/membersTasks', (req, res) => {
    const taskId = req.params.id
    //router.listen( () => console.log(taskId))
    const task = tasks.find(task=>parseInt( task.id)=== parseInt(taskId))
    var routerliedmembers=[]
   
    if(task.applied_id!==null){
    for(var member of task.applied_id){
        //console.log(memberId)
        const member1 = members.find(member1=> member1.id=== member)    
        routerliedmembers.push(member1)
    }
    res.send(routerliedmembers)
    }else{
        res.send('No members applied yo this task')
    }
})

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
module.exports = router
