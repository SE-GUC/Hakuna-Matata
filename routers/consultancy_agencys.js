const express = require('express');
const router = express.Router();
const agency = require('../models/consultancy_agency'); 
const Joi = require('joi');
const taskConsulted = require('../models/taskConsulted'); 
const constultancy_agencies = require('../models/constultancy_agency1'); 
 
const tasker=require('../models/task');
const tasks=require('../models/task1')

router.get('/show_unconsultedtasks',(req,res)=>{
    res.send(show_uncosultedtasks());
});
function show_uncosultedtasks(){
    return taskConsulted.filter(checkAdult) ;
};


router.post('/feedback/:agency_id/:id',(req,res)=>{
    const schema={
        description:Joi.string().required(),
        deadline:Joi.string().required(),
	    commit_level:Joi.number().integer().min(0).max(5).required(),
	    experiance_level:Joi.number().integer().min(0).max(5).required(),
        monetory_compensation:Joi.string().required(),
        required_skills:Joi.string().required(),    
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    add_consultedtask(parseInt(req.params.id),parseInt(req.params.agency_id),req.body.description,req.body.required_skills,req.body.monetary_compensation,req.body.deadline,req.body.experience_level,req.body.commit_level);
    res.send(taskConsulted);
});
function add_consultedtask(taskid,consultancy_agency_id,description,required_skills,monetary_compensation,deadline,experience_level,commit_level){
    var taask=taskConsulted.find(m => m.id===taskid&&m.consultancy_agency_id===0);
    var task_created=new tasker(taskid,taask.partner_id,consultancy_agency_id,taask.member_id,taask.partner_id,null,description,required_skills,monetary_compensation,deadline,taask.dealine_for_apply,taask.upload_date,null,experience_level,commit_level,taask.work_cycle,taask.link_of_task,taask.user_rate,taask.accepted,taask.consult_needed);
    taskConsulted.push(task_created);
};


router.get('/show', (req, res) => res.json(show_agencies()));
function show_agencies(){
    return {data: constultancy_agencies} ;
}
router.get('/show/:agency_id', (req, res) =>{
     var x= constultancy_agencies.find(m => m.id===parseInt(req.params.agency_id));
     res.send(x);
});
router.post('/add_agency/:partner_id',(req,res)=>{
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
    var x=[parseInt(req.params.partner_id)];
    if(req.body.parteners!=null){
    req.body.parteners.forEach(element => {
        x.push(element);
    });
    };
    add_agencies(req.body.name,req.body.information,x,req.body.members,req.body.reports);
    res.send(constultancy_agencies);
});
function add_agencies(name,information,parteners,members,reports){
    const agency_input=new agency(constultancy_agencies.length+1,name,null,information,parteners,members,reports);
    constultancy_agencies.push(agency_input);
};

router.put('/update_agency/:agency_id',(req,res)=>{
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
    var x= constultancy_agencies.find(m => m.id===parseInt(req.params.agency_id));
    if(req.body.name!=null){
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
    }
});
router.delete('/delete_agency/:agency_id',(req,res)=>{
    const indx=constultancy_agencies.indexOf(constultancy_agencies.find(m => m.id===parseInt(req.params.agency_id)));
    constultancy_agencies.splice(indx,1);
res.send(constultancy_agencies);
});

router.post('/add_report/:id',(req,res)=>{
    add_report(parseInt(req.params.id),req.body.report);
    res.send(constultancy_agencies);
});
function add_report(id,report){
    constultancy_agencies.find(m => m.id===id).reports.push(report);
};

function checkAdult(obj) {
    return obj.consultancy_agency_id === 0;
  };

router.get('/show_consulted_tasks/:partner_id/:task_id',(req,res)=>{
    taskConsulted.forEach(element => {
        if(element.partner_id===parseInt(req.params.partner_id)&&element.id===parseInt(req.params.task_id)&&element.consultancy_agency_id>0){
            res.write(JSON.stringify(element));
        }
    });
    res.end();
});
  module.exports = router