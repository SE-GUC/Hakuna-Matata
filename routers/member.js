const express = require('express')
const router = express.Router();
const Joi = require('joi');
const {Member,getexplevel} = require('../models/member.js');
const Project = require('../models/project.js');
const notObject=require('../models/Notification.js');

//Member CRUD

//create member
//1
router.post('/create', async (request,response)=>{
    const schema={

        fullname:Joi.string().required(),
        skills:Joi.array().items(Joi.string())

     }
     const result=Joi.validate(request.body,schema);
    
     if (result.error) return response.status(400).send({ error: result.error.details[0].message });
  else {
    const fullname=request.body.fullname;
    var splitted=fullname.split(" ");
    var webname=splitted[0];
    const skills= request.body.skills;
    const member = new Member ({
        fullname:fullname,
        webname:webname,
        completed_task_id:[],
        applied_task_id:[],
        levelofexpreience:0,
        Rating:0,
        all_rated_reco:0,
        avreage_reco_rate:0,
        allratedtasks:0,
        skills:skills
    });
    
    await member.save();
    response.sendStatus(200);
   
}
   
});

//delete member 
//1
router.delete('/deleteMember/:id',async (req,res)=>{
   try {
    const id = req.params.id
    const deletedMember = await Member.findOneAndRemove({"_id":id})
    if(deletedMember!==null)
    res.json({msg:'Member was deleted successfully', data: deletedMember})
    else
    res.json({msg:'Member was deleted Already or Not Found'})

   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }
 
  });




// Get all members
//1
router.get('/', async (req, res) =>{
  await  Member.find({}, function(err, members) {
          
        if(!err){
            res.send(members);

          }
          else{
            res.status(404).send('Not found');

          }
      });

});

//get member by id
router.get('/:id',async (req,res)=>{

 await Member.findById(req.params.id, function(err, members) {
     if(!err){
        if(members!==null)
        res.send(members);
        else
        res.send('Not found');

     }
     else {
        res.status(404).send('Not found');
     }  
      });
     


})

// update member name and skills
//update a member

router.put("/:id/update",async (req,res)=>{
  const schema={
    fullname:Joi.string().required(),
   
  };
  const result =Joi.validate(req.body,schema);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
  } 
  await Member.findById(req.params.id, function(err, members) {
      if(!err){
          if(req.body.fullname!=null){
           members.fullname=req.body.fullname
          }
       const result=members.save()
       res.send(members); 

        }
        else{
          res.status(404).send('Not found');

        }  
       });

});
//end marina part
//create project
router.post('/:id/create_project',(request,response)=>{
    const schema={

        taskid:Joi.string().required(),
        partnerid:Joi.string().required(),
        link:Joi.string().required()

     }
     const result=Joi.validate(request.body,schema);
    
     if (result.error) return response.status(400).send({ error: result.error.details[0].message });
  else {
    const tID=request.body.taskid;
    const pID=request.body.partnerid;
    const LINK=request.body.link;
    const mID=request.params.id;




    const project = new Project ({
        task_id:tID,
    partner_id:pID,
    member_id:mID,
    link:LINK
    });
 
    project.save();
  
    response.sendStatus(200);
   
}
   
});



//get project by member id

router.get('/:id/projects',(req,res)=>{
var temp=[];
Project.find({}, function(err, members) {
          
    if(!err){
        for (var i = 0; i < members.length; i++) {
            if(members[i].member_id==req.params.id){
                temp.push(members[i]);
            }
            
        }
        res.send(temp);
        //res.send(200);

      }
      else{
        res.status(404).send('Not found');

      }
  });
   
   })

//delete project 
router.delete('/:id/project/:pid', function(req,res){
Project.findById(req.params.pid, function(err, project) {
    if(!err){
        
       if(project.member_id==req.params.id){
        Project.findByIdAndRemove(
            req.params.pid,
            function(err) {
              if(!err){
                res.sendStatus(200);
    
              }
              else{
                res.status(404).send('Not found');
    
              }
            }
        );
       }
       else{
        res.status(404).send('not allowed to delete this project');
       }
    }
    else {
       res.status(404).send('Error!');
    }  
     });



    
 
  });

//update project 
router.put("/:id/updateproject/:pid",(req,res)=>{
    const schema={
      link:Joi.string().required(),
     
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    } 
    Project.findById(req.params.pid, function(err, project) {
        if(!err){  
            console.log("here")
           if(project.member_id==req.params.id){
            project.link=req.body.link;
            console.log("here")
            project.save();
            res.send(project);
           }
           else{
            res.status(404).send('not allowed to delete this project');
           }
        }
        else {
           res.status(404).send('Error!');
        }  
         });
  
  });


//Badr Part
//update rating (id =>memberId)
//1
router.put('/:id/ratemember',async (request,response)=>{
    var id=request.params.id;
    const newrate = request.body.newrate;
    var nooftasks;
    const schema={

    newrate: Joi.number().integer().max(5).required(),
  
}
const result=Joi.validate(request.body,schema);
if (result.error) return response.status(400).send({ error: result.error.details[0].message });
    var object =await Member.findById(id)
     if(object !== undefined){
         nooftasks=object.allratedtasks;

         const x=object.allratedtasks+1;
         var temprate;
         if(Math.round(((object.Rating*nooftasks)+newrate)/x)>5)
         temprate=5
         else
         temprate=Math.round(((object.Rating*nooftasks)+newrate)/x)
        // object.save()
         object =await Member.findOneAndUpdate({"_id":id},{"allratedtasks":x,"Rating":temprate})
         response.sendStatus(200);


     }else{
        response.send("Not found");

     }
 
});


//2
router.put('/:id/applyForTask', async(req, res) => {
    const memberId = req.params.id
    const taskId = req.body.task_Id
    const task = await Task.findById(taskId)
    if(task!==null){
    const member = await Member.findById(memberId)
   if(member!==null){
    if(task.accepted){
        //onsole.log("we are Here")
       // const appliedtoit=task.applied
        var matches=0
        //var tempmembers=[]
            for(var requires of task.required_skills){
          for(var memberskill of member.skills ){
                    if((memberskill)===(requires)){
                        matches++
                    }

                }

            }
           // console.log(task.required_skills.length)
           // console.log((task.experience_level))
            if(matches>=task.required_skills.length&member.levelofexpreience>=task.experience_level){
                if(task.applied_id===null)
                    task.applied_id=[]

                task.applied_id.push(member._id)
                if(member.appliedtask===null)
                     member.appliedtask=[]

               member.appliedtask.push( task._id)
               member.save()
               task.save()
                res.send(member)
                console.log("done")
                //tempmembers.push(memberdata)
            }else{
                res.status(400);
                res.send("Sorry u can not Apply , u Dont have the required Specifications")
            }}else{
              res.status(400).send("member id is not available");
            
            }}else{
              res.status(400).send("task id is not available");
            
            }
} 
else{
    res.status(400);
    res.send('This task has not yet been accepted');
}

});
//2
router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= notObject.SendToAdminRequestNotification("Member "+id+" wants to edit his profile");
    response.sendStatus(200);
});
// End Badr Part


 module.exports = router
