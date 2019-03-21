const express = require('express')
const router = express.Router();
const Joi = require('joi');
const Member = require('../models/member.js');
//create member
router.post('/create',(request,response)=>{
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
    
    member.save();
    response.sendStatus(200);
   
}
   
});

//delete member 
router.delete('/deleteMember/:id', function(req,res){

    Member.findByIdAndRemove(
        req.params.id,
        function(err) {
          if(!err){
            res.sendStatus(200);

          }
          else{
            res.status(404).send('Not found');

          }
        }
    );
 
  });




// Get all members
router.get('/', (req, res) =>{
    Member.find({}, function(err, members) {
          
        if(!err){
            res.send(members);

          }
          else{
            res.status(404).send('Not found');

          }
      });

});

//get member by id
router.get('/:id',(req,res)=>{

 Member.findById(req.params.id, function(err, members) {
     if(!err){
        res.send(members);
     }
     else {
        res.status(404).send('Not found');
     }  
      });


})

// update member name and skills
//update a member

router.put("/:id/update",(req,res)=>{
  const schema={
    fullname:Joi.string().required(),
   
  };
  const result =Joi.validate(req.body,schema);
  if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
  } 
  Member.findById(req.params.id, function(err, members) {
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



// We will be connecting using database 
//const member = require('../models/member.js')
//const members = require('../arrays/members')
// temporary data created as if it was pulled out of the database ...
/*
const notObject = require("../arrays/Notifications.js");
const courseRequestArray = require("../arrays/Courserequests.js");
const Memberarray = require("../arrays/members.js");
const tasks = require("../arrays/tasks.js");

router.get('/tasks', (req, res) => {
    res.send(tasks)
   
});



//update rating (id =>memberId)
router.put('/:id/ratemember',(request,response)=>{
    var id=request.params.id;
    const newrate = request.body.newrate;
    var nooftasks;
const schema={

    newrate: Joi.number().integer().max(5).required(),
  
}
const result=Joi.validate(request.body,schema);
if (result.error) return response.status(400).send({ error: result.error.details[0].message });
 for(let object of Memberarray){
     if(object.id==id){
         nooftasks=object.allratedtasks;
         object.allratedtasks=object.allratedtasks+1;
         object.Rating=Math.floor(((object.Rating*nooftasks)+newrate)/object.allratedtasks);
        

     }
 }
 response.sendStatus(200);
});




//router.get('/', (req, res) => res.json({ data: members }))
// Apply for a task
router.put('/:id/applyForTask/:task_Id', (req, res) => {
    const memberId = req.params.id
    const taskId = req.params.task_Id
    const task = tasks.find(task => parseInt(task.id) === parseInt(taskId))
    const member = Memberarray.find(member => parseInt(member.id) === parseInt(memberId))
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

                task.applied_id.push(member.id)
            if(member.appliedtask===null)
                member.appliedtask=[]

               member.appliedtask.push( task.id)
                res.send(member)
                console.log("done")
                //tempmembers.push(memberdata)
            }else{
                res.send("Sorry u can not Apply , u Dont have the required Specifications")
            }
} 
else{
    res.status(400);
    res.send('This task has not yet been accepted');
}

});

/*ask to edit profile marina*/
//(id =>memberId)
/*
router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= notObject.SendToAdminRequestNotification("Member "+id+" wants to edit his profile");
    response.sendStatus(200);
});
router.get('/', (req, res) => {
    res.send(Memberarray)
})


// Get a certain member (id =>memberId)
router.get('/:id', (req, res) => {
    for (const object of Memberarray){
        if(object.id==req.params.id){
            res.send(object);
      }
      }
     
      });
*/
 module.exports = router
