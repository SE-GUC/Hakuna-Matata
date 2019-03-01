//i can  delete my requested job
router.delete("/delete/:id/:partner_id",(req,res) =>{
    const task =tasks.find(m=>m.id===parseInt(req.params.id)&&m.partner_id===parseInt(req.params.partner_id));    
    if(task.accepted===false){
    tasks.splice(task);
}

res.send(tasks);
});

//i can update my task
router.put("/update_task/:id",(req,res) =>{
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
    var x= tasks.find(m => m.id===parseInt(req.params.id));
    if(x.accepted===false){
    if(req.body.description!=null){
        x.description=req.body.description;
        }
    if(req.body.required_skills!=null){
        x.required_skills=req.body.required_skills;
        }
    if(req.body.monetary_compensation!=null){
    x.monetary_compensation=req.body.monetary_compensation;
        }
    if(req.body.deadline!=null){
    x.deadline=req.body.deadline;
        }
    if(req.body.deadline_for_apply!=null){
    x.deadline_for_apply=req.body.deadline_for_apply;
        }
    if(req.body.experience_level!=null){
        x.experience_level=req.body.experience_level;
        } 
    if(req.body.commit_level!=null){
        x.commit_level=req.body.commit_level;
        } }
        else{
            res.send("YOU CAN NOT UPDATE!!!!!");
        }    
        res.send(tasks);
        });

//View task Cycle 
router.get('/viewCycle/:id', (req, res) => {
    const taskId = req.params.id
    //router.listen( () => console.log(taskId))
    const task = tasks.find(task=> task.id=== taskId)
    if(task !==undefined)
    res.send(task.workcycle)
    else{
        res.send(0)
    }

})




//give feedback or report about the task
router.post("/give_rate/:partner_id/:id",(req,res)=>{
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

 
