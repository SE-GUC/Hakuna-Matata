const mongoose= require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const task = require('../models/task.js'); 
const Member = require('../models/member.js'); 

//const taskConsulted = require('../arrays/taskConsulted.js'); 
//const tasks= require('../arrays/tasks.js');
//const platform= require('../arrays/platform.js');
//const members= require('../arrays/members.js');
const {Send_Task_Notification} = require('../models/Notification.js');

//create task
router.post('/create/:id',async (req,res)=>{
    try{
    const schema={
        description:Joi.string().required(),
        consult_needed:Joi.boolean().required(),
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
    const task1=new task({
        partner_id:req.params.id,
        consultancy_agency_id:0,
        member_id:null,
        admin_id:null,
        applied_id:[],
        description:req.body.description,
        required_skills:req.body.required_skills,
        monetary_compensation:req.body.monetory_compensation,
        deadline:req.body.time,
        deadline_for_apply:null,
        upload_date:null,
        submission_date:null,
        experience_level:req.body.experiance_level,
        commit_level:req.body.level_of_commitment,
        work_cycle:null,
        link_of_task:null,
        user_rate:null,
        accepted:null,
        rate:null,
        consulty_needed:req.body.consult_needed,
        cunsulties_done:[]
    });
//const ta = await task.create(req.body)
task.insertMany(task1);
const taS = await task.find()
res.json({data : task1});
}
catch(error){
    // we will handling the error later
    console.log(error) 
}
});

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
router.get("/:id/admin" ,async(req,res)=>{
    try{
    const ta = await task.findOne({'_id':req.params.id});
    res.json({data: ta})
    }
    catch(error){
        console.log(error);
    }
});

//show all tasks
router.get("/",async (req,res)=>{
    const taS = await task.find()
    res.json({data : taS});
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
router.delete('/:id/deletetask', async (req, res) => {
    try {
        const id = req.params.id
        const task1=await task.find({'_id':id})
        if(!task1){
            res.send("task not found");
            return;
        }
        const deletedTask = await task.findByIdAndRemove(id)
        res.json({msg:'Task was deleted successfully', data: deletedTask})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
   } 
});

// delete a certin task by his partner (id =>taskId , partner_id=> owner of the task)
router.delete("/:id/delete/:partner_id",(req,res) =>{
    const task =tasks.find(m=>m.id===parseInt(req.params.id)&&m.partner_id===parseInt(req.params.partner_id));    
    if(task!==undefined){
        if(task.accepted===null ){
            tasks.splice(task);
            res.send('Task deleted');
        } 
        else {
            
            res.send('U CANT DELETE THIS TASK')
        }

    }else{
    res.send('this task is not available ');   
    }

   
});


// rate a task by his partner (id =>taskId , partner_id=> owner of the task)
router.post("/:id/give_rate/:partner_id",(req,res)=>{
    const task = tasks.find(m=>m.id===parseInt(req.params.id));
if(task.partner_id===parseInt(req.params.partner_id)){
    const schema={
	   rate:Joi.number().integer().min(1).max(5).required(),
	  
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    task.rate=req.body.rate;
    res.send(tasks);
    return;
}
res.send("YOU CANT RATE THIS TASK");
});



// update a task (id =>taskId)
router.put("/:id/update_task",async (req,res) =>{
    try{
    const id = req.params.id
    const ta = await task.findOne({"_id":req.params.id})
    if(!ta) 
    return res.status(404).send({error : 'task does not exist '})
    if(ta.accepted == false||ta.accepted==null){
        const schema={
            description:Joi.string(),
            required_skills:Joi.string(),
            monetary_compensation:Joi.number(),
            deadline:Joi.string(),
            deadline_for_apply:Joi.string(),
            experience_level:Joi.number().integer().min(1).max(5),
            commit_level:Joi.number().integer().min(1).max(5)
    
        };
    
        const result =Joi.validate(req.body,schema);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };

        const ta = await task.findOneAndUpdate({'_id':req.params.id},req.body)
        res.json({msg : 'task updated successfully'})
    }
    else {
        return res.status(404).send({error : 'can not update '})
    }
}
catch(error) {
    console.log(error)
}  
});
//badr
// Update a tasks's state (taskID =>taskId , adminId=> admin who reject or accept the task)
//1
router.put('/:adminId/edit/:taskID',async (req, res) => {
    const admin_Id=req.params.adminId
    const task_Id = req.params.taskID 
    const acceptancy = req.body.state
    try{
    const vartask = await task.findOne({"_id":task_Id})
        //console.log(vartask)
        if(vartask!== undefined){
            //   vartask.accepted = acceptancy
               if(acceptancy===true){       
                 const temptask=  await task.findOneAndUpdate({"_id":task_Id},{"admin_id":admin_Id,"accepted":acceptancy})
                   //tasks.splice(tasks.indexOf(vartask),1)
                   //platform.push(task1.id)
                   //tasks.push(task1)
                   
                   var e=Send_Task_Notification(task_Id,vartask.partner_id,"Your task has been accepted");
                   res.json({data:temptask})
               }
               else{
                   var e=Send_Task_Notification(task_Id,vartask.partner_id,"Your task has been rejected");
                   const temptask=  await task.findOneAndRemove({"_id":task_Id})
                   res.json({data:temptask})
       
               }
       
           }
           else{
               res.send('there is not such task') 
           }
           
}catch{
    res.status(400).send("Error");
}

})
//1
router.put('/:id/updateworkcycle',async(request,response)=>{
    
    const taskid=request.params.id;
    const newworkcycle = request.body.work_cycle;
    var memberid =0;
    const schema={
      
       work_cycle: Joi.number().valid(25,50,75,100).required(),
      
    }
    const result=Joi.validate(request.body,schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });
    const ttask=await task.findOneAndUpdate({"_id":taskid},{"work_cycle":newworkcycle})
    if(ttask!==null){
        
        memberid= ttask.member_id
        if(newworkcycle==100){
            const member=await Member.findOneAndUpdate({"_id":memberid},{$push :{"completed_task_id":taskid}})
        }
        response.send(ttask);
  
    }
    else{
        response.send("There is no Such Task")
    }
});



// rate a task by his partner (id =>taskId , partner_id=> owner of the task)
//1
router.put("/:id/give_rate/:partner_id",async (req,res)=>{
    var ttask = await task.findById(req.params.id);
    if(ttask.partner_id==req.params.partner_id){
        const schema={
	      rate:Joi.number().integer().min(1).max(5).required(),
	  
        };
        const result =Joi.validate(req.body,schema);
         if(result.error){
            res.status(400).send(result.error.details[0].message);
        
        }
        else{
           ttask= await task.findOneAndUpdate({"_id":req.params.id},{"rate":req.body.rate}) 
            res.send(ttask)
        }

    }
    else
        res.send("YOU CANT RATE THIS TASK");
});


// Assignig a member to a certain task (id =>taskId , memberId=> member who will be assigned to a task)
//1,2
router.put('/:id/assTask/:memberId',async (req, res) => {
    const task_Id = req.params.id 
    const member_Id=req.params.memberId
    const ttask = await task.findById(task_Id)
  
if (ttask.applied_id==null){
    res.status(400);
res.send('No members applied yet');
}
else{

    if(ttask.accepted===true&&(ttask.member_id===null||ttask.member_id.length===0)){
        const appliedtoit=ttask.applied_id
      
        const check=appliedtoit.find(check=>check==member_Id)
        if(check!==undefined){
            const member = await Member.findById( member_Id)
            if(member!== undefined){

                await Member.findOneAndUpdate( {"_id":member_Id},{$push:{"applied_task_id":task_Id}})
             const temptask=   await task.findOneAndUpdate({"_id": task_Id},{"work_cycle":0,"member_id":member_Id})

                var e=Send_Task_Notification(task_Id,member_Id,"You have been assigned!");
                var e=Send_Task_Notification(task_Id,task.partner_id,"You task has been assigned to a member!");
                res.json({data:temptask})

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
//2
router.put('/:id/forceAssTask/:memberId',async (req, res) => {
    const task_Id = req.params.id 
    const member_Id=req.params.memberId
    const task = await tasks.findById( task_Id)
    if(task.accepted&&task.member_id.length==0){
            const member =await  Member.findById(member_Id)
            if(member!== undefined){
                member.appliedtask.push(task_Id)
                task.member_id=member_Id
                res.send(task)
                member.save()
                
            }
            else{
                res.send("This member is Deleted")
            }
    }
})

// Get a All member of specific task
//1
router.get('/:id/membersTasks',async (req, res) => {
    const taskId = req.params.id
    //router.listen( () => console.log(taskId))
    const ttask =await task.findById(taskId);
    var routerliedmembers=[]
   
    if(ttask.applied_id!==null){
       const  members=await Member.find()
    for(var member of ttask.applied_id){
        //console.log(memberId)
        const member1 = members.find(member1=> member1._id == member)    
        routerliedmembers.push(member1)
    }
    res.send(routerliedmembers)
    }else{
        res.send('No members applied yo this task')
    }
})

//View task Cycle (id =>taskId )
//1
router.get('/:id/viewCycle', async (req, res) => {
    const ttask =await task.findById(req.params.id);
    if(ttask !==undefined)
    res.send(ttask.workcycle)
    else{
        res.send('This task not Found !')
    }

})


//end badr
/* 
// delete a certin task by his partner (id =>taskId , partner_id=> owner of the task)
router.delete("/:id/delete/:partner_id",(req,res) =>{
    const task =tasks.find(m=>m.id===parseInt(req.params.id)&&m.partner_id===parseInt(req.params.partner_id));    
    if(task!==undefined){
        if(task.accepted===null ){
            tasks.splice(task);
            res.send('Task deleted');
        } 
        else {
            
            res.send('U CANT DELETE THIS TASK')
        }

    }else{
    res.send('this task is not available ');   
    }

   
}); */



module.exports = router
