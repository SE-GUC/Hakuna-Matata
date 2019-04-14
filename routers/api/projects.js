const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Project = require('../../models/Project.js')
const projectValidator = require('../../validations/projectValidations.js')
const Task = require('../../models/Task.js')
const taskValidator = require('../../validations/taskValidations.js')
const  User  = require('../../models/User.js');
const { sendTaskNotification } = require('../../models/Notification.js');

// CRUD
//create project

router.post('/:id', async (req, res) => {
    try {
        const isValidated = projectValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const project = {
            name: req.body.name,
            projectPartner: {
                id: req.params.id,
                name: req.body.projectPartner
            },
            project: req.body.project,
            description: req.body.description,
            consultyNeeded: req.body.consultyNeeded,
            deadline: req.body.deadline,
            commitLevel: req.body.commitLevel,
            experienceLevel: req.body.experienceLevel,
            monetaryCompensation: req.body.monetaryCompensation,
            requiredSkills: req.body.requiredSkills,
        }
        const newProject = await Project.create(project)
        res.json({ msg: 'project was created successfully', data: newProject })
    }
    catch (error) {
        // we will handling the error later
        console.log(error)
    }
})

// get a specific project      (id =>projectId)
router.get('/:id', async (req, res) => {
    try {
        const projects = await Project.findOne({ '_id': req.params.id });
        res.json({ data: projects })
    }
    catch (error) {
        console.log(error);
    }
});

//show all projects
router.get('/', async (req, res) => {
    const project = await Project.find()
    res.json({ data: project });
})

// update a project (id =>projectId)
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const oldProject = await Project.findById(id)
        if (!oldProject) return res.status(404).send({ error: 'project does not exist ' })
        if (oldProject.accepted === false || oldProject.accepted == null) {
            const isValidated = projectValidator.updateValidation(req.body);
            if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
            const updatedProject = await Project.findOneAndUpdate({ '_id': req.params.id }, req.body)
            res.json({ msg: 'project updated successfully' })
        }
        else {
            return res.status(404).send({ error: 'can not update ' })
        }
    }
    catch (error) {
        console.log(error)
    }
})

// Delete Certine project 
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedProject = await Project.findByIdAndRemove(id)
        res.json({ msg: 'Project was deleted successfully', data: deletedProject })
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
})
// End of CRUD
// Update a projects's state 
router.put('/edit/:id/:adminId', async (req, res) => {
    const adminId = req.params.adminId
    const projectId = req.params.id
    const acceptancy = req.body.accepted
    try {
        const varproject = await Project.findById(projectId)
        if (varproject) {
            //   varproject.accepted = acceptancy
            if (acceptancy === true) {
                varproject.adminId = adminId
                varproject.accepted = acceptancy
                const partner =await User.findOne({_id:varproject.projectPartner.id ,tags: 'Partner'})
                partner.partnerTasks.push({
                    id:varproject._id,
                    name:varproject.name
                })
                partner.save()
                varproject.save()
                var e = sendTaskNotification(projectId, varproject.partnerId, 'Your project has been accepted');
                res.json({ data: varproject })
            }
            else {
                var e = sendTaskNotification(projectId, varproject.partnerId, 'Your project has been rejected');
                const tempproject = await Project.findByIdAndRemove(projectId)
                res.json({ data: tempproject })
            }
        }
        else {
            res.send('there is not such project')
        }

    } catch(err){
        res.status(400).send('Error');
    }

})
router.put('/assignMemberToProject/:id', async (req, res) => {
    const projectId = req.params.id
    const memberId = req.body.memberId
    const ownerId = req.body.ownerId

    const project = await Project.findById(projectId)
    const member = await User.findOne({ _id: memberId, tags: 'Member' })
   if(project.projectPartner.id===ownerId||project.projectConsultancyAgency.id===ownerId){
    var indexOfMember = project.appliedMembers.findIndex(member => member.id === memberId)
    var indexOfProject = member.appliedInProjects.findIndex(project => project.id === projectId)
    if(indexOfMember >-1&indexOfProject>-1 ){
    project.appliedMembers.splice(indexOfMember, 1)
    member.appliedInProjects.splice(indexOfProject, 1)
    project.projectMember = {
        name: member.memberFullName,
        id: member._id
    }
    project.workCycle=0
    member.acceptedInProjects.push({ name: project.name, id: project._id })
    
    var e = sendTaskNotification(projectId, memberId, 'You have been assigned!')
    var e = sendTaskNotification(projectId, project.partnerId, 'You project has been assigned to a member!')
    member.save()
    project.save()
    res.json({ data: project })

}else{
    res.status(404).send('the project or member is not applied')

}
}else{
    res.status(400).send('You are not the partner or consultancy')
}

})
router.put('/updateWorkCycle/:id', async (request, response) => {

    const projectId = request.params.id;
    const newWorkCycle = request.body.workCycle;

    const schema = {
        workCycle: Joi.number().valid(25, 50, 75, 100).required(),
    }
    const result = Joi.validate(request.body, schema);
    if (result.error) return response.status(400).send({ error: result.error.details[0].message });

    const updatedProject0 = await Project.findOneAndUpdate({ _id: projectId }, { workCycle: newWorkCycle })

    if (updatedProject0 !== null) {

        const memberId = updatedProject0.memberId
        if (newWorkCycle === 100) {
            const member = await User.findOneAndUpdate({ _id: memberId }, {
                $push: {
                    completedProjects: {
                        id: projectId,
                        name: updatedProject0.name
                    }
                }
            })

            for (var index = 0; member.acceptedInProjects.length; index++) {
                if (member.acceptedInProjects[index].id == projectId) {
                    member.acceptedInProjects.splice(index, 1)
                    index--;
                }
            }
            member.save()
        }
        const updatedProject = await Project.findById(projectId )

        response.send(updatedProject);

    }
    else {
        response.send('There is no Such Project')
    }
})
// rate a project by his partner (id =>projectId , partner_id=> owner of the project)
router.put('/giveRate/:id/:partnerId', async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project.projectPartner.id == req.params.partnerId) {
        const schema = {
            rate: Joi.number().integer().min(1).max(5).required(),
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send(result.error.details[0].message)
        }
        else {
        await Project.findOneAndUpdate({ _id: req.params.id }, {rate: req.body.rate })
            const updatedProject = await Project.findById(req.params.id)

            res.send(updatedProject)
        }

    }
    else
        res.send('YOU CANT RATE THIS TASK');
})
// Get a All member of specific project
router.get('/membersProject/:id', async (req, res) => {
    const projectId = req.params.id
    const project = await Project.findById(projectId);
    if (project.appliedMembers !== null) {
        res.send(project.appliedMembers )
    } else {
        res.send('No members applied yo this project')
    }
})
//View project Cycle 
router.get('/viewCycle/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (project !== undefined)
        if (project.workCycle === null)
            res.send(null)
        else
            res.send(project.workCycle)
    else {
        res.send('This project not Found !')
    }

})
//create task
router.post('/task/:id', async (req, res) => {
    try {
        const project= await Project.findById({ '_id': req.params.id })
        req.body.taskPartner=project.projectPartner
        const isValidated = taskValidator.createValidation(req.body);
        req.body.tag='Project'

        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const task = {
            name: req.body.name,
            taskPartner: 
                project.projectPartner
              ,
            project: {
                id:project._id,
                name:project.name
            },
            tag: req.body.tag,
            description: req.body.description,
            consultyNeeded: req.body.consultyNeeded,
            deadline: req.body.deadline,
            commitLevel: req.body.commitLevel,
            experienceLevel: req.body.experienceLevel,
            monetaryCompensation: req.body.monetaryCompensation,
            requiredSkills: req.body.requiredSkills,
        }
        const newTask = await Task.create(task)
        project.tasks.push({id:newTask._id,
        name:newTask.name})
        project.save()
        res.json({ msg: 'task was created successfully', data: newTask })
    }
    catch (error) {
        // we will handling the error later
        console.log(error)
    }
})

module.exports = router
