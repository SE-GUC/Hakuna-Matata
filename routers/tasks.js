const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Task = require('../models/Task.js')
const taskValidator = require('../validations/taskValidations.js')
const {Member} = require('../models/Member.js');
const { sendTaskNotification } = require('../models/Notification.js');

// CRUD
//create task
router.post('/:id', async (req, res) => {
    try {
        const isValidated = taskValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const task = new Task({
            partnerId: req.params.id,
            consultancyAgencyId: "",
            memberId: null,
            adminId: null,
            appliedId: [],
            description: req.body.description,
            requiredSkills: req.body.requiredSkills,
            monetaryCompensation: req.body.monetaryCompensation,
            deadline: req.body.deadline,
            deadlineForApply: null,
            uploadDate: null,
            submissionDate: null,
            experienceLevel: req.body.experienceLevel,
            commitLevel: req.body.commitLevel,
            workCycle: null,
            linkOfTask: null,
            userRate: null,
            accepted: null,
            rate: null,
            consultyNeeded: req.body.consultyNeeded,
            consultanciesDone: []
        });
        //const ta = await task.create(req.body)
        //  May cause Prob
        Task.insertMany(task);
        const taskSave = await Task.find()
        res.json({ data: task });
        // End of prob
    }
    catch (error) {
        // we will handling the error later
        console.log(error)
    }
})

// get a specific task      (id =>taskId)
router.get("/:id", async (req, res) => {
    try {
        const tasks = await Task.findOne({ '_id': req.params.id });
        res.json({ data: tasks })
    }
    catch (error) {
        console.log(error);
    }
});

//show all tasks
router.get("/", async (req, res) => {
    const task = await Task.find()
    res.json({ data: task });
})

// update a task (id =>taskId)
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const oldTask = await Task.findById(id)
        if (!oldTask)return res.status(404).send({ error: 'task does not exist ' })
        if (oldTask.accepted == false || oldTask.accepted == null) {
            const isValidated = taskValidator.updateValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const updatedTask = await Task.findOneAndUpdate({ '_id': req.params.id }, req.body)
            res.json({ msg: 'task updated successfully' })
        }
        else {
            return res.status(404).send({ error: 'can not update ' })
        }
    }
    catch (error) {
        console.log(error)
    }
})

// Delete Certine task from Array
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedTask = await Task.findByIdAndRemove(id)
        res.json({ msg: 'Task was deleted successfully', data: deletedTask })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
// End of CRUD

//badr
// Update a tasks's state (taskID =>taskId , adminId=> admin who reject or accept the task)
//1
router.put('/edit/:id/:adminId', async (req, res) => {
    const adminId = req.params.adminId
    const taskId = req.params.id
    const acceptancy = req.body.accepted    
    try {
        const vartask = await Task.findOne({"_id": taskId })
        
      
        if (vartask !== undefined) {
            
            //   vartask.accepted = acceptancy
            if (acceptancy === true) {
                console.log("46546")
                const temptask = await Task.findOneAndUpdate({ "_id": taskId }, { "adminId": adminId, "accepted": acceptancy })
                console.log(temptask)
                const vartask2 = await Task.findOne({"_id": taskId })
        
                var e = sendTaskNotification(taskId, vartask.partnerId, "Your task has been accepted");

                res.json({ data: vartask2 })
            }
            else {
                var e = sendTaskNotification(taskId, vartask.partnerId, "Your task has been rejected");
                const temptask = await Task.findOneAndRemove({ "_id": taskId })
                res.json({ data: temptask })

            }

        }
        else {
            res.send('there is not such task')
        }

    } catch{
        res.status(400).send("Error");
    }

})
//1
router.put('/updateWorkCycle/:id', async (request, response) => {

    const taskId = request.params.id;
    const newWorkCycle = request.body.workCycle;
    
    const schema = {
        workCycle: Joi.number().valid(25, 50, 75, 100).required(),
    }
    const result = Joi.validate(request.body, schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });

    const updatedTask0 = await Task.findOneAndUpdate({ "_id": taskId }, { "workCycle": newWorkCycle })
    
    if (updatedTask0 !== null) {

        const memberId = updatedTask0.memberId
        if (newWorkCycle == 100) {
            const member = await Member.findOneAndUpdate({ "_id": memberId }, { $push: { "completedTaskId": taskId } })
        }
        const updatedTask = await Task.findOne({ "_id": taskId })
  
        response.send(updatedTask);

    }
    else {
        response.send("There is no Such Task")
    }
});



// rate a task by his partner (id =>taskId , partner_id=> owner of the task)
//1
router.put("/giveRate/:id/:partnerId", async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task.partnerId == req.params.partnerId) {
        const schema = {
            rate: Joi.number().integer().min(1).max(5).required(),
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send(result.error.details[0].message)
        }
        else {
            const updatedTask = await Task.findOneAndUpdate({ "_id": req.params.id }, { "rate": req.body.rate })
            const updatedTask0 = await Task.findOne({ "_id": req.params.id })
          
            res.send(updatedTask0)
        }

    }
    else
        res.send("YOU CANT RATE THIS TASK");
});


// Assignig a member to a certain task (id =>taskId , memberId=> member who will be assigned to a task)
//1,2
router.put('/assTask/:id/:memberId', async (req, res) => {
    const taskId = req.params.id
    const memberId = req.params.memberId
    const task = await Task.findById(taskId)

    if (task.appliedId == null) {
        res.status(400);
        res.send('No members applied yet');
    }
    else {

        if (task.accepted === true && (task.memberId === null || task.memberId.length === 0)) {
            const appliedtoit = task.appliedId

            const check = appliedtoit.find(check => check == memberId)
            if (check !== undefined) {

                const member = await Member.findOne({'_id':memberId})
                if (member !== undefined) {

                    await Member.findOneAndUpdate({ "_id": memberId }, { $push: { "appliedTaskId": taskId } })
                    const temptask = await Task.findOneAndUpdate({ "_id": taskId }, { "workCycle": 0, "memberId": memberId })
const taskk = await Task.findOne({'_id':taskId})
                    var e = sendTaskNotification(taskId, memberId, "You have been assigned!");
                    var e = sendTaskNotification(taskId, task.partnerId, "You task has been assigned to a member!");
                    res.json({ data: taskk })

                }
                else {
                    res.send("This member is Deleted")
                }

            }
            else
                res.send("This member not one of the applied members")


        } else {
            if (task.accepted !== true)
                res.send("This Task not accepted")
            else
                res.send("This Task is already assigned to a member ")
        }

    }
}
)

// Assignig a member to a certain task (id =>taskId , memberId=> member who will be assigned to a task)
//2
router.put('/forceAssTask/:id/:memberId', async (req, res) => {
    const taskId = req.params.id
    const memberId = req.params.memberId
    const task = await Task.findById(taskId)
    if (task.accepted && task.memberId.length == 0) {
        const member = await Member.findById(memberId)
        if (member !== undefined) {
            member.appliedTask.push(taskTd)
            task.memberId = memberId
            res.send(task)
            member.save()

        }
        else {
            res.send("This member is Deleted")
        }
    }
})

// Get a All member of specific task
//1
router.get('/membersTask/:id', async (req, res) => {
    const taskId = req.params.id
    //router.listen( () => console.log(taskId))
    const task = await Task.findById(taskId);
    var appliedMember = []

    if (task.appliedId !== null) {
        const members = await Member.find()
        for (var member of task.appliedId) {
            const member1 = members.find(member1 => member1._id == member)
            appliedMember.push(member1)
        }
        res.send(appliedMember)
    } else {
        res.send('No members applied yo this task')
    }
})

//View task Cycle (id =>taskId )
//1
router.get('/viewCycle/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task !== undefined)
    if(task.workCycle===null)
    res.send(null)
    else
        res.send(task.workCycle)
    else {
        res.send('This task not Found !')
    }

})


//end badr

module.exports = router
// Check for it
/* // delete a certin task by his partner (id =>taskId , partner_id=> owner of the task)
router.delete("/delete/:id/:partnerId",(req,res) =>{
    const task =tasks.find(m=>m.id===parseInt(req.params.id)&&m.partnerId===parseInt(req.params.partner_id));
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

router.put('/:id/updateworkcycle',(request,response)=>{

    const taskId=request.params.id;
    const newWorkCycle = request.body.workCycle;
    var memberId =0;
    const schema={
       workCycle: Joi.number().valid(25,50,75,100).required(),
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


