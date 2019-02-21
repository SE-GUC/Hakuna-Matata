const express = require('express');
const app = express();
app.use(express.json());
const Joi = require('joi');
const taskConsulted=[
    
    
    
];
const tasks = [

];


app.post('/create_task/:id',(req,res)=>{
    const schema={
        description:Joi.string().required(),
        consult_needed:Joi.boolean(),
        time:Joi.string(),
	    level_of_commitment:Joi.number().integer().min(1).max(5),
	    experiance_level:Joi.number().integer().min(1).max(5),
        monetory_compensation:Joi.string(),
        required_skills:Joi.string(),
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
        monetory_compensation:Joi.string().required(),
        required_skills:Joi.string().required(),

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    let task = {id:tasks.length+1,
        partner_id:parseInt(req.params.id)
    ,description:req.body.description
    ,consult_needed:req.body.consult_needed
    ,time:req.body.time
    ,level_of_commitment:req.body.level_of_commitment
    ,experiance_level:req.body.experiance_level
    ,monetory_compensation:req.body.monetory_compensation,
    consultancy_agency :0,
    required_skills:req.body.required_skills,
    accepted:false,
    accepted_id:null,
    applied:[

    ]
};

tasks.push(task);
res.send(tasks);
return;
}




    let task = {
        id:tasks.length+1,
        partner_id:parseInt(req.params.id)
        ,description:req.body.description
        ,consult_needed:req.body.consult_needed
        ,time:req.body.time
        ,level_of_commitment:req.body.level_of_commitment
        ,experiance_level:req.body.experiance_level
        ,monetory_compensation:req.body.monetory_compensation,
        required_skills:req.body.required_skills,
        accepted:false,
        accepted_id:null,
    applied:[
        
    ]
    };
taskConsulted.push(task);
res.send(taskConsulted);
}
);

app.listen(3000,()=>console.log("create a task"));