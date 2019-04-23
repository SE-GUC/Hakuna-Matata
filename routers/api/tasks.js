const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Task = require('../../models/Task.js')
const taskValidator = require('../../validations/taskValidations.js')
const User = require('../../models/User.js');
const Skills = require('../../models/Skill.js');
const { sendTaskNotification } = require('../../models/Notification.js');
const Platform = require('../../models/Platform')



//get all skills
router.get('/skills', async (req, res) => {
    const skill = await Skills.find()
    res.json({ data: skill });
})
// CRUD
//create task
router.post('/', async (req, res) => {
    try {
        const isValidated = taskValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const task = {
            tag: 'Task',
            name: req.body.name,
            taskPartner: req.body.taskPartner,
            project: req.body.project,
            description: req.body.description,
            consultyNeeded: req.body.consultyNeeded,
            deadline: req.body.deadline,
            commitLevel: req.body.commitLevel,
            experienceLevel: req.body.experienceLevel,
            monetaryCompensation: req.body.monetaryCompensation,
            requiredSkills: req.body.requiredSkills,
        }
        const newTask = await Task.create(task)
        res.json({ msg: 'task was created successfully', data: newTask })
    }
    catch (error) {
        // we will handling the error later
        console.log(error)
    }
})

// get a specific task      (id =>taskId)
router.get('/:id', async (req, res) => {
    try {
        const tasks = await Task.findOne({ '_id': req.params.id });
        res.json({ data: tasks })
    }
    catch (error) {
        console.log(error);
    }
});

//show all tasks
router.get('/', async (req, res) => {
    const task = await Task.find()
    res.json({ data: task });
})

// update a task (id =>taskId)
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const oldTask = await Task.findById(id)
        if (!oldTask) return res.status(404).send({ error: 'task does not exist ' })
        if (oldTask.accepted === false || oldTask.accepted == null) {
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

// Delete Certine task 
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
// Update a tasks's state 
router.put('/edit/:id/:adminId', async (req, res) => {
    const adminId = req.params.adminId
    const taskId = req.params.id
    const acceptancy = req.body.acceptancy
    try {
        const vartask = await Task.findById(taskId)
        if (vartask) {
            //   vartask.accepted = acceptancy
            // console.log(acceptancy ===true)
            // console.log(acceptancy )
            if (acceptancy === true) {
                vartask.adminId = adminId
                vartask.accepted = acceptancy
                vartask.save()
                //
                //console.log(acceptancy )

                const partner = await User.findOneAndUpdate({ _id: vartask.taskPartner.id, tags: 'Partner' },{$push:{partnerTasks:{
                    id: vartask._id,
                    name: vartask.name,
                    date: new Date().toJSON()
                }}})
                // partner.partnerTasks.push({
                //     id: vartask._id,
                //     name: vartask.name,
                //     date: new Date().toJSON()
                // })
                // partner.save()
                //    recomm  
                if(vartask.consultyNeeded){
                      await Platform.create({
                        tags: ['Partner', 'ConsultancyAgency'],
                        type: 'Task',
                        date: new Date().toJSON(),
                        owener: {
                            id: partner._id,
                            name: partner.partnerName
                        },
                        data: {
                            id: vartask._id,
                            name: vartask.name,
                        },
                        description: vartask.description
    
                    })
                }else{
             const platformItem=   await Platform.create({
                    tags: ['Partner', 'Member', 'ConsultancyAgency'],
                    type: 'Task',
                    date: new Date().toJSON(),
                    owener: {
                        id: partner._id,
                        name: partner.partnerName
                    },
                    data: {
                        id: vartask._id,
                        name: vartask.name,
                    },
                    description: vartask.description

                })
                
                const members = await User.find({ tags: 'Member', skills: { $all: vartask.requiredSkills } })
                members.map((member) => {
                    member.recomended.push({
                        id:platformItem._id,
                        type: 'Task',
                        date: new Date().toJSON(),
                        owener: {
                            id: partner._id,
                            name: partner.partnerName
                        },
                        data: {
                            id: vartask._id,
                            name: vartask.name,
                        },
                        description: vartask.description

                    })

                    member.save()
                })
            }
             sendTaskNotification(taskId, vartask.taskPartner.id, 'Your task has been accepted');
                res.json({ data: vartask })
            }
            else {
                var e = sendTaskNotification(taskId, vartask.taskPartner.id, 'Your task has been rejected');
                const temptask = await Task.findByIdAndRemove(taskId)
                res.json({ data: temptask })
            }
        }
        else {
            res.send('there is not such task')
        }

    } catch (err){
        console.log(err)
    }

})
//s enum:['Apply For Task', 'Apply For Project','Follow','Give Recomendation to','Apply For Course','Apply For Master Class','Reserve a','Rate','Assign','Accept']


router.put('/assignMemberToTask/:id', async (req, res) => {
    const taskId = req.params.id
    const memberId = req.body.memberId
    const ownerId = req.body.ownerId
    try {

        const task = await Task.findById(taskId)
        const member = await User.findOne({ _id: memberId, tags: 'Member' })
        
        if (task.taskPartner.id == ownerId || task.taskConsultancyAgency.id == ownerId) {
            var indexOfMember = task.appliedMembers.findIndex(member => member.id == memberId)
            var indexOfTask = member.appliedInTasks.findIndex(task => task.id == taskId)
            if (indexOfMember > -1 & indexOfTask > -1) {
                task.appliedMembers.splice(indexOfMember, 1)
                member.appliedInTasks.splice(indexOfTask, 1)
                task.taskMember = {
                    name: member.memberFullName,
                    id: member._id,
                    date: new Date().toJSON()
                }
                task.workCycle = 0
                member.acceptedInTasks.push({ name: task.name, id: task._id, date: new Date().toJSON() })
                
                await User.findOneAndUpdate({ _id: ownerId },{$push:{history:{
                    action:'Assign',
                    name:{
                        name: member.memberFullName,
                        id: member._id,
                    },
                    date: new Date().toJSON()
                }}})

                

                sendTaskNotification(taskId, memberId, 'You have been assigned!')
                sendTaskNotification(taskId, task.partnerId, 'You task has been assigned to a member!')
                member.save()
                task.save()
                res.json({ data: task })

            } else res.status(404).send('the task or member is not applied') 
        } else res.status(400).send('You are not the partner or consultancy')      
    }catch (err) {
        res.status(400).send('error')
    }
})
//View task Cycle 
router.get('/viewCycle/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task) {
        if (task.workCycle == null || task.workCycle == undefined) {
            res.send(0)
        }
        else {
            res.status(200).send({ data: task.workCycle })
        }
    } else {
        res.send('This task not Found !')
    }

})
router.put('/updateWorkCycle/:id', async (request, response) => {

    const taskId = request.params.id;
    const newWorkCycle = request.body.workCycle;

    const schema = {
        workCycle: Joi.number().valid(25, 50, 75, 100).required(),
    }
    const result = Joi.validate(request.body, schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });

    const updatedTask= await Task.findOneAndUpdate({ _id: taskId }, { workCycle: newWorkCycle })

    if (updatedTask ) {
        const memberId = updatedTask.taskMember.id
        if (newWorkCycle === 100) {
            const member = await User.findOneAndUpdate({ _id: memberId }, {$push: {completedTasks: {id: taskId,name: updatedTask.name}}})
            if ( member.acceptedInTasks == undefined)  member.acceptedInTasks = []
            member.acceptedInTasks= member.acceptedInTasks.filter((task) => task.id != taskId)

            // for (var index = 0; member.acceptedInTasks.length; index++) {
            //     if (member.acceptedInTasks[index].id == taskId) {
            //         member.acceptedInTasks.splice(index, 1)
            //         index--;
            //     }
            // }
            member.save()
        }           
        const returnedTask = await Task.findById(taskId)

        response.send(returnedTask);

    }
    else {
        response.send("There is no Such Task")
    }
})
// rate a task by his partner (id =>taskId , partner_id=> owner of the task)
router.put("/giveRate/:id/:partnerId", async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (task.taskPartner.id == req.params.partnerId) {
        const schema = {
            rate: Joi.number().integer().min(1).max(5).required(),
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send(result.error.details[0].message)
        }
        else {
            await Task.findOneAndUpdate({ _id: req.params.id }, { rate: req.body.rate })
            const updatedTask = await Task.findById(req.params.id)

            res.send(updatedTask)
        }

    }
    else
        res.send("YOU CANT RATE THIS TASK");
})
// Get a All member of specific task
router.get('/membersTask/:id', async (req, res) => {
    const taskId = req.params.id
    const task = await Task.findById(taskId);
    if (task.appliedMembers !== null) {
        res.send(task.appliedMembers)
    } else {
        res.send('No members applied yo this task')
    }
})

module.exports = router
