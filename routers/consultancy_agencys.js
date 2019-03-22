const express = require('express');
const router = express.Router();

const Joi = require('joi');

const agency = require('../models/consultancy_agency'); 
const tasker=require('../models/task');
const {Send_Task_Notification} = require("../arrays/Notifications.js");
//const taskConsulted = require('../arrays/taskConsulted'); 
const constultancy_agencies = require('../arrays/constultancy_agencys'); 
const tasks=require('../arrays/tasks')

router.get('/show_unconsultedtasks',(req,res)=>{
    res.send(show_uncosultedtasks());
});
function show_uncosultedtasks(){
    return tasks.filter(checkAdult) ;
};
function checkAdult(obj) {
    return (obj.consultancy_agency_id === 0 ||obj.consultancy_agency_id==null) && obj.consulty_needed==true;
  };


router.post('/feedback/:agency_id/:id',(req,res)=>{
    const schema={
        description:Joi.string().required(),
        deadline:Joi.string().required(),
	    commit_level:Joi.number().integer().min(0).max(5).required(),
	    experiance_level:Joi.number().integer().min(0).max(5).required(),
        monetary_compensation:Joi.string().required(),
        required_skills:Joi.array().required(),    
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    add_consultedtask(parseInt(req.params.id),parseInt(req.params.agency_id),req.body.description,req.body.required_skills,req.body.monetary_compensation,req.body.deadline,req.body.experience_level,req.body.commit_level);
    res.send(tasks);
});
function add_consultedtask(taskid,consultancy_agency_id,description,required_skills,monetary_compensation,deadline,experience_level,commit_level){
    var taask=tasks.find(m => m.id===taskid&&m.consultancy_agency_id===0);
    var task_created=new tasker(taskid,taask.partner_id,consultancy_agency_id,taask.member_id,taask.admin_id,null,description,required_skills,monetary_compensation,deadline,taask.dealine_for_apply,taask.upload_date,null,experience_level,commit_level,taask.work_cycle,taask.link_of_task,taask.user_rate,taask.accepted,taask.rate,taask.consulty_needed,[]);
    taask.cunsulties_done.push(task_created);
};

//show all agencies
router.get('/show', async (req, res) =>{
    const agencies = await agency.find();
    res.json(agencies);
});
//show agency with id equal agency_id
router.get('/show/:agency_id', async (req, res) =>{
    const id=req.params.agency_id
    var x= await agency.find({"_id" :id});
     if(!x){
        res.send("consultancy agency not found");
        return;
    }
     res.send(x);
});

//create agency
router.post('/add_agency/:partner_id',async (req,res)=>{
    try{
        //res.json("creating");
    const schema={
        name:Joi.string().required(),
        information:Joi.string().required(),
        parteners:Joi.array(),
        members:Joi.array(),
        reports:Joi.array()
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //var x=req.params.partner_id;
    //req.params.parteners.push(x);
    //add_agencies(req.body.name,req.body.information,x,req.body.members,req.body.reports);
    req.body.parteners.push(req.params.partner_id);
    const agent=new agency({
        name:req.body.name,
        rate:null,
        information:req.body.information,
        parteners:req.body.parteners,
        members:req.body.members,
        reports:req.body.reports
    });
    await agency.insertMany(agent);
    //const newagency= await agency.create(req.body);
    const agencies = await agency.find();
    res.json(agencies);
    }
    catch(error){
        console.log(error);
    }
});

//update agency with id equal agency_id
router.put('/update_agency/:agency_id',async (req,res)=>{
    try{
        const id=req.params.agency_id
        var x= await agency.find({"_id" :id});
    if(!x){
        res.send("consultancy agency not found");
        return;
    }
    const schema={
        name:Joi.string(),
        information:Joi.string(),
        parteners:Joi.array(),
        members:Joi.array(),
        reports:Joi.array()
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
    /*if(req.body.name!=null){
        x.name=req.body.name;
    }
    if(req.body.information!=null){
        x.information=req.body.information;
    }
    if(req.body.parteners!=null){
        x.parteners=req.body.parteners;
    }
    if(req.body.members!=null){
        x.members=req.body.members;
    }
    if(req.body.reports!=null){
        x.reports=req.body.reports;
    }*/
    const query = await agency.findOneAndUpdate({'_id':req.params.agency_id},req.body)
    const agencies = await agency.find();
    res.json(agencies);
}
catch(error){
    console.log(error);
};
});

//delete agency with id equal agency_id
router.delete('/delete_agency/:agency_id',async (req,res)=>{

    try{
        const id=req.params.agency_id
        var x= await agency.find({'_id':id});
        if(!x){
            res.send("consultancy agency not found");
            return;
        }
        const deletedAgency = await agency.findByIdAndRemove(id)
        const agencies = await agency.find();
    res.json(agencies);
    }
    catch(error){
        console.log(error);
    }
});

//add report in agency with id equal id
router.put('/add_report/:id',async (req,res)=>{
    try{
    const id=req.params.id
        var x= await agency.findOne({'_id':id});
        if(!x){
            res.send("consultancy agency not found");
            return;
        }
   x.reports.push(req.body.report);
  await agency.findOneAndUpdate({'_id':id},{"reports":x.reports});
    const agencies = await agency.find();
    res.json(agencies);
    }
    catch(error){
        res.send(error);
    }
});

//(partner_id  => partnerId, task_id=>taskId)
router.get('/show_consulted_tasks/:partner_id/:task_id',(req,res)=>{
    const task=tasks.find(m => m.id===parseInt(req.params.task_id)&&m.partner_id===parseInt(req.params.partner_id));
    if(!task){
        res.send("not found");
    }
    else
    res.send(task.cunsulties_done);
});
//(id  => constultancyAgencysId, partner_id  => partnerId, task_id=>taskId,)
router.put('/:id/accept_consulted_tasks/:partner_id/:task_id',(req,res)=>{
    /*tasks.forEach(element => {
        if(element.partner_id===parseInt(req.params.partner_id)&&element.id===parseInt(req.params.task_id)){
            tasks.cunsulties_done.forEach(elem=>{
                if(elem.consultancy_agency_id===parseInt(req.params.id)){
                    tasks.push(elem);
                    var e=Send_Task_Notification(req.params.task_id,elem.consultancy_agency_id,"Your consultancy has been accepted!");
                    const indx=tasks.indexOf(element);
                    tasks.splice(indx,1);
                }
            });
        }
    }); */
    const task=tasks.find(m => m.id===parseInt(req.params.task_id)&&m.partner_id===parseInt(req.params.partner_id));
    if(task!=null){
        const consultance=task.cunsulties_done.find(m => m.consultancy_agency_id===parseInt(req.params.id));
        if(!consultance){
            res.send("not found");
            return;
        }
       /* task.cunsulties_done.forEach(element=>{
            consultance.cunsulties_done.push(element);
        });*/
        const cons=new tasker(consultance.id,consultance.partner_id,consultance.consultancy_agency_id,consultance.member_id,consultance.admin_id,consultance.applied_id,consultance.description,consultance.required_skills,consultance.monetary_compensation,consultance.deadline,consultance.deadline_for_apply,consultance.upload_date,consultance.submission_date,consultance.experience_level,consultance.commit_level,consultance.work_cycle,consultance.link_of_task,consultance.user_rate,consultance.accepted,consultance.rate,consultance.consulty_needed,task.cunsulties_done);
        tasks.push(cons);
        var e=Send_Task_Notification(req.params.task_id,consultance.consultancy_agency_id,"Your consultancy has been accepted!");
        const indx=tasks.indexOf(task);
                    tasks.splice(indx,1);
    }
    else{
        res.send("not found");
        return;
    }
    //res.send(taskConsulted);
    res.send(tasks);
    
    
});
/*function delete_consulted(task_id){
    for (i = taskConsulted.length - 1; i >= 0; i -= 1) {
        if (taskConsulted[i].id === task_id ) {
            taskConsulted.splice(i, 1);
        }
    }
};*/


//update consultance to a certain task
//(id=> consultancyAgencysId,task_id=>partenerId)
router.put('/:id/update_consultance/:task_id',(req,res)=>{
    const task=tasks.find(m => m.id===parseInt(req.params.task_id));
    const consultance =task.cunsulties_done.find(m=>m.consultancy_agency_id===parseInt(req.params.id));

    const schema={
        description:Joi.string(),
        required_skills:Joi.string(),
        monetary_compensation:Joi.string(),
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

    if(req.body.description!=null){
        consultance.description=req.body.description;
        }
    if(req.body.required_skills!=null){
        consultance.required_skills=req.body.required_skills;
        }
    if(req.body.monetary_compensation!=null){
    consultance.monetary_compensation=req.body.monetary_compensation;
        }
    if(req.body.deadline!=null){
    consultance.deadline=req.body.deadline;
        }
    if(req.body.deadline_for_apply!=null){
    consultance.deadline_for_apply=req.body.deadline_for_apply;
        }
    if(req.body.experience_level!=null){
        consultance.experience_level=req.body.experience_level;
        } 
    if(req.body.commit_level!=null){
        consultance.commit_level=req.body.commit_level;
        }
        res.send(tasks);
});

//delete certain consultance of a task
router.delete('/:id/delete_consultance/:taskid',(req,res)=>{
    const task=tasks.find(m => m.id===parseInt(req.params.taskid));
    const consultance=task.cunsulties_done.find(m=>m.consultancy_agency_id===parseInt(req.params.id));
    if(!task.cunsulties_done.find(m=>m.consultancy_agency_id===parseInt(req.params.id))){
        res.send('consultance not found');
        return;
    };
    const indx=task.cunsulties_done.indexOf(consultance);
    task.cunsulties_done.splice(indx,1);
    res.send(tasks);
});
  module.exports = router