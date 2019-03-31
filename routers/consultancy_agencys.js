const mongoose= require('mongoose');
const express = require('express');
const router = express.Router();

const Joi = require('joi');

const agency = require('../models/consultancy_agency'); 
const tasker=require('../models/consultance');
const task=require('../models/task');
const {Send_Task_Notification} = require('../models/Notification.js');
//const taskConsulted = require('../arrays/taskConsulted'); 
//const constultancy_agencies = require('../arrays/constultancy_agencys'); 
//const tasks=require('../arrays/tasks')


//create a consultance to a task with id equal id by consultancy agency with id equal agency_id
router.post('/feedback/:agency_id/:id', async (req,res)=>{
    try{
    const schema={
        description:Joi.string().required(),
        deadline:Joi.string().required(),
	    commit_level:Joi.number().integer().min(0).max(5).required(),
	    experience_level:Joi.number().integer().min(0).max(5).required(),
        monetary_compensation:Joi.number().required(),
        required_skills:Joi.array().required(),    
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const tassk=await task.findOne({
        '_id':req.params.id,
        consulty_needed:true,
        consultancy_agency_id:0
    });
    if(!tassk){
        res.status(404).json("task not found or don't need consultance");
        return;
    }
    const consult=new tasker({
        partner_id:tassk.partner_id,
        consultancy_agency_id:req.params.agency_id,
        member_id:tassk.member_id,
        admin_id:tassk.admin_id,
        applied_id:tassk.applied_id,
        description:req.body.description,
        required_skills:req.body.required_skills,
        monetary_compensation:req.body.monetary_compensation,
        deadline:req.body.deadline,
        deadline_for_apply:tassk.deadline_for_apply,
        upload_date:tassk.upload_date,
        submission_date:tassk.submission_date,
        experience_level:req.body.experience_level,
        commit_level:req.body.commit_level,
        work_cycle:tassk.work_cycle,
        link_of_task:tassk.link_of_task,
        user_rate:tassk.user_rate,
        accepted:tassk.accepted,
        rate:tassk.rate,
        consulty_needed:tassk.consulty_needed,
        cunsulties_done:[]
    });
    tassk.cunsulties_done.push(consult);
    const query = await task.findOneAndUpdate({'_id':req.params.id},{cunsulties_done:tassk.cunsulties_done});
    const taS = await task.findOne({'_id':req.params.id})
    res.json(taS);
}
catch(error){
    res.status(404).json("task not found or don't need consultance");
}
});

//show all agencies
router.get('/show', async (req, res) =>{
    const agencies = await agency.find();
    res.json(agencies);
});
//show agency with id equal agency_id
router.get('/show/:agency_id', async (req, res) =>{
    const id=req.params.agency_id
    try{
    var x= await agency.findById({"_id" :id});
      if(!x){
         res.status(404).send("consultancy agency not found");
         return;
     }
     res.send(x);
}
 catch(error){
 res.status(404).send("consultancy agency not found");
 }
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
    res.json(agent);
    }
    catch(error){
        res.status(404).send(error)
    }
});



//update agency with id equal agency_id
router.put('/update_agency/:agency_id',async (req,res)=>{
    try{
        const id=req.params.agency_id
        var x= await agency.find({"_id" :id});
    if(!x){
        res.status(404).send("consultancy agency not found");
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
    
    if(req.body.members!=null){
        x.members=req.body.members;
    }
    if(req.body.reports!=null){
        x.reports=req.body.reports;
    }*/
     await agency.findOneAndUpdate({'_id':req.params.agency_id},req.body)
     const query =await agency.findOne({'_id':req.params.agency_id})
    // const agencies = await agency.find();
    res.json(query);
}
catch(error){
    res.status(404).send("consultancy agency not found");
};
});

//delete agency with id equal agency_id
router.delete('/delete_agency/:agency_id',async (req,res)=>{

    try{
        const id=req.params.agency_id
        var x= await agency.find({'_id':id});
        if(!x){
            res.status(404).send("consultancy agency not found")
            return;
        }
        const deletedAgency = await agency.findByIdAndRemove(id)
    res.json(deletedAgency);
    }
    catch(error){
        res.status(404).send("consultancy agency not found")
    }
});

//add report in agency with id equal id
router.put('/add_report/:id',async (req,res)=>{
    try{
    const id=req.params.id
        var x= await agency.findOne({'_id':id});
        if(!x){
            res.status(404).send("consultancy agency not found");
            return;
        }
   x.reports.push(req.body.report);
  await agency.findOneAndUpdate({'_id':id},{"reports":x.reports});
  const agenc=await agency.findOne({'_id':id});
    //const agencies = await agency.find();
    res.json(agenc);
    }
    catch(error){
        res.status(404).send("consultancy agency not found");
    }
});

//show all the tasks that need consultance 
router.get('/show_unconsultedtasks',async (req,res)=>{
    try{
    const unconsulted=await task.find({ 
        consulty_needed:true,
        consultancy_agency_id:0
     });
    res.send(unconsulted);
    }
    catch(error){
        res.status(404).json('no task found');
    }
});
//show all consultancies for a certain task
//(partner_id  => partnerId, task_id=>taskId)
router.get('/show_consulted_tasks/:partner_id/:task_id',async (req,res)=>{
    try{
    const tassk=await task.findOne({
        '_id':req.params.task_id,
        partner_id:req.params.partner_id
    });
    if(!tassk){
        res.status(404).send("not found");
    }
    else
    res.send(tassk.cunsulties_done);
}
catch(error){
    res.status(404).send("not found");
}
});

//show certain consultancies for a certain task
//(partner_id  => partnerId, task_id=>taskId,consultance_id+>ConsultancyAgencyId)
router.get('/show_consulted_task/:partner_id/:task_id/:consultance_id',async (req,res)=>{
    try{
    const tassk=await task.findOne({
        '_id':req.params.task_id,
        partner_id:req.params.partner_id
    });
    if(!tassk){
        res.status(404).send("not found");
        return;
    }
    const consultance=tassk.cunsulties_done.find(m=>m.consultancy_agency_id==req.params.consultance_id);
    if(!consultance){
        res.status(404).send("not found");
        return;
    }
    res.send(consultance);
}
catch(error){
    res.status(404).send("not found");
}
});

//(id  => constultancyAgencysId, partner_id  => partnerId, task_id=>taskId,)
router.put('/:id/accept_consulted_tasks/:partner_id/:task_id',async (req,res)=>{
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
    try{
    const tassk=await task.findOne({
        '_id':req.params.task_id,
        partner_id:req.params.partner_id
    });
        if(tassk!=null){
        const consultance=tassk.cunsulties_done.find(m => m.consultancy_agency_id==req.params.id);
        if(!consultance){
            res.status(404).send("consultance not found");
            return;
        }
       /* task.cunsulties_done.forEach(element=>{
            consultance.cunsulties_done.push(element);
        });*/
        const consult=new task({
            partner_id:consultance.partner_id,
            consultancy_agency_id:consultance.consultancy_agency_id,
            member_id:consultance.member_id,
            admin_id:consultance.admin_id,
            applied_id:consultance.applied_id,
            description:consultance.description,
            required_skills:consultance.required_skills,
            monetary_compensation:consultance.monetary_compensation,
            deadline:consultance.deadline,
            deadline_for_apply:consultance.deadline_for_apply,
            upload_date:consultance.upload_date,
            submission_date:consultance.submission_date,
            experience_level:consultance.experience_level,
            commit_level:consultance.commit_level,
            work_cycle:consultance.work_cycle,
            link_of_task:consultance.link_of_task,
            user_rate:consultance.user_rate,
            accepted:consultance.accepted,
            rate:consultance.rate,
            consulty_needed:consultance.consulty_needed,
            cunsulties_done:tassk.cunsulties_done
        });
        /*tassk.cunsulties_done.forEach(element=>{
            consultance.cunsulties_done.push(element);
        });*/
        task.insertMany(consult);
        var e=Send_Task_Notification(req.params.task_id,consultance.consultancy_agency_id,"Your consultancy has been accepted!");
        await task.findByIdAndDelete(req.params.task_id);
        res.send(consult);
        //await task.findOneAndUpdate({'_id':req.params.task_id},consultance);
    }
    else{
        res.status(404).send("task not found");
        return;
    }
    //res.send(taskConsulted);
}
catch(error){
    res.status(404).send(error);
}
    
});


//update consultance to a certain task
//(id=> consultancyAgencysId,task_id=>partenerId)
router.put('/:id/update_consultance/:task_id',async (req,res)=>{
    try{
    const tassk=await task.findOne({
        '_id':req.params.task_id,
    });
    if(!tassk){
        res.status(404).send('task not found');
        return;
    }
        const consultance =tassk.cunsulties_done.find(m=>m.consultancy_agency_id==req.params.id);
        if(!consultance){
            res.status(404).send('consultance not found');
            return
        }
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

        await task.findOneAndUpdate({'_id':req.params.task_id},{cunsulties_done:tassk.cunsulties_done});
        const taS = await task.findOne({'_id':req.params.task_id})
        res.send(taS.cunsulties_done.find(m=>m.consultancy_agency_id==req.params.id));
    }
    catch(error){
        res.status(404).send("not found")
    }
});

//delete certain consultance of a task
router.delete('/:id/delete_consultance/:taskid',async (req,res)=>{
    try{
    const tassk=await task.findOne({
        '_id':req.params.taskid,
    });
    if(!tassk){
        res.status(404).send('task not found');
        return;
    }
    const consultance=tassk.cunsulties_done.find(m=>m.consultancy_agency_id==req.params.id);
    if(!consultance){
        res.status(404).send('consultance not found');
        return;
    };
    const indx=tassk.cunsulties_done.indexOf(tassk.cunsulties_done.find(m=>m.consultancy_agency_id==req.params.id));
    tassk.cunsulties_done.splice(indx,1);
    const taS=await task.findOneAndUpdate({'_id':req.params.taskid},{cunsulties_done:tassk.cunsulties_done});
    res.send(taS.cunsulties_done.find(m=>m.consultancy_agency_id==req.params.id));
}
catch(error){
    res.status(404).send('not found');
}
});
  module.exports = router