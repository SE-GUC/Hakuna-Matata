const express = require('express')
const router = express.Router()
const Joi = require('joi');

// We will be connecting using database 
//const member = require('../models/member.js')
//const members = require('../arrays/members')
// temporary data created as if it was pulled out of the database ...

const notObject = require("../arrays/Notifications.js");
const courseRequestArray = require("../arrays/Courserequests.js");
const Memberarray = require("../arrays/members.js");
const tasks = require("../arrays/tasks.js");

router.get('/tasks', (req, res) => {
    res.send(tasks)
   
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

// Delete Certine Member from Array  (id =>memberId)
router.delete('/:id/deleteMember', (req, res) => {
    const memberId = req.params.id
    //router.listen( () => console.log(memberId))
    const member = Memberarray.find(member=> parseInt(member.id) === parseInt(memberId))
    if(member!==undefined){
        Memberarray.splice(Memberarray.indexOf(member),1)
        res.send('Done')}
    else{
        res.send('this id is not on the System')
    }
})


// Get a certain member (id =>memberId)
router.get('/:id/admin', (req, res) => {
    for (const object of Memberarray){
        if(object.id==req.params.id){
            res.send(object);
      }
      }
     
      });
//get all members
      router.get('/', (req, res) => {
        res.send(Memberarray)
    })
/*ask to edit profile marina*/
//(id =>memberId)
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

	  
	  module.exports = router
