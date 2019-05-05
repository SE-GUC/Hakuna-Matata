const express = require('express')
const router = express.Router()
<<<<<<< HEAD
const Joi = require('joi');
const passport = require('passport')

const User = require('../../models/User')
const consultancyAgencyValidator = require('../../validations/consultancyAgencyValidations.js')
const Task = require('../../models/Task')
const Project = require('../../models/Project')
const Platform = require('../../models/Platform')


// consultancyAgency CRUD
router.post('/:id', async (req, res) => {
  try {
    const isValidated = consultancyAgencyValidator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const currUser = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (currUser) return res.status(404).send('You are already a ConsultancyAgency on the site')
    await User.findByIdAndUpdate(req.params.id, req.body)
    await User.findByIdAndUpdate(req.params.id, { consultancyAgencyDateJoined: new Date().toJSON(), $push: { tags: 'ConsultancyAgency' } })
    const consultancyAgency = await User.findById(req.params.id)
    res.json({msg:'Consultancy Agency Created Successfully', data: consultancyAgency });

  } catch (err) {
    // We will be handling the error later
    res.status(404).send('error')
  }
})
//get all ConsultancyAgencies
router.get('/', async (req, res) => {
  const consultancyAgencies = await User.find({ tags: 'ConsultancyAgency' })
  res.json({ data: consultancyAgencies })
})
//get Certin ConsultancyAgency
router.get('/:id', async (req, res) => {
  const consultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
  if (!consultancyAgency) return res.status(404).send({ error: 'ConsultancyAgency does not exist' })
  res.json({ data: consultancyAgency })
=======

const User = require('../../models/User')
const consultancyAgencyValidator = require('../../validations/consultancyAgencyValidations.js')

const Task = require('../../models/Task')
const taskValidator = require('../../validations/taskValidations.js')


// consultancyAgency CRUD
router.post('/:id', async (request, response) => {
    try {
        const isValidated = consultancyAgencyValidator.createValidation(request.body);
        if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })

        const currUser = await User.findOne({ _id: request.params.id, tags: 'ConsultancyAgency' })
        if (currUser) return response.status(404).send('You are already a ConsultancyAgency on the site')
        await User.findByIdAndUpdate(request.params.id, request.body)
        await User.findByIdAndUpdate(request.params.id, { consultancyAgencyDateJoined: new Date().getDate() })
        await User.findByIdAndUpdate(request.params.id, { $push: { tags: 'ConsultancyAgency' } })
        const consultancyAgency = await User.findById(request.params.id)
        response.send(consultancyAgency);

    } catch (err) {
        // We will be handling the error later
        response.status(404).send('error')
    }
})
//get all ConsultancyAgencies
router.get('/', async (req, res) => {
    const consultancyAgencies = await User.find({ tags: 'ConsultancyAgency' })
    res.json({ data: consultancyAgencies })
})
//get Certin ConsultancyAgency
router.get('/:id', async (req, res) => {
    const consultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    res.json({ data: consultancyAgency })
>>>>>>> master

})
// update ConsultancyAgency name 
router.put('/:id', async (req, res) => {
<<<<<<< HEAD
  const isValidated = consultancyAgencyValidator.updateValidation(req.body);
  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

  try {
    const consultancyAgency = await User.findOneAndUpdate({ _id: req.params.id, tags: 'ConsultancyAgency' }, req.body)
    if (!consultancyAgency) return res.status(404).send({ error: 'ConsultancyAgency does not exist' })
    const updatedConsultancyAgency = await User.findById(req.params.id)
    res.json({msg:'Consultancy Agency updated Successfully', dataupdatedConsultancyAgency})
  } catch (error) {
    res.status(404).send('error')

  }
=======
    const isValidated = consultancyAgencyValidator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    try {
        const consultancyAgency = await User.findOneAndUpdate({ _id: req.params.id, tags: 'ConsultancyAgency' }, req.body)
        const updatedConsultancyAgency = await User.findById(req.params.id)
        res.send(updatedConsultancyAgency)
    } catch (error) {

    }
>>>>>>> master
})
// delete ConsultancyAgency 
// Delete ConsultancyAgency delete 
router.delete('/:id', async (req, res) => {
<<<<<<< HEAD
  try {
    const currConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (currConsultancyAgency) {
      const index = currConsultancyAgency.tags.indexOf('ConsultancyAgency')
      const deletedConsultancyAgency = currConsultancyAgency.tags.splice(index, 1)
      currConsultancyAgency.save()
      res.json({ msg: 'Consultancy Agency was deleted successfully', data: deletedConsultancyAgency })
    } else {
      res.json({ msg: 'Consultancy Agency was deleted Already or Not Found' })
    }
  }
  catch (error) {
    // We will be handling the error later
    res.status(404).send('error')
  }
=======
    try {
        const currConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
        if (currConsultancyAgency) {
            const index = currConsultancyAgency.tags.indexOf('ConsultancyAgency')
           currConsultancyAgency.tags.splice(index, 1)
           currConsultancyAgency.save() 
            res.json({ msg: 'ConsultancyAgency was deleted successfully' })
        } else {
            res.json({ msg: 'ConsultancyAgency was deleted Already or Not Found' })
        }
    }
    catch (error) {
        // We will be handling the error later
        console.log(error)
    }
>>>>>>> master
})



<<<<<<< HEAD

//add report in agency with id equal id
// y
router.put('/report/:id', async (req, res) => {
  try {
    const schema = {
      report: Joi.string().required(),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    const id = req.params.id
    var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })

    if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
    oldConsultancyAgency.consultancyAgencyReports.push({
      info: req.body.report,
      postDate: new Date().toJSON()
    })
    await Platform.create({
      tags: ['Partner', 'Member', 'ConsultancyAgency', 'CoworkingSpace', 'EducationOrganization'],
      type: 'Report',
      date: new Date().toJSON(),
      owner: {
        id: req.params.id,
        name: oldConsultancyAgency.consultancyAgencyName
      },
     description: req.body.report      
    })
    oldConsultancyAgency.save()
    const returnedConsultancyAgency = await User.findOne({ '_id': id })
    res.json({msg: 'Report added successfully',  data: returnedConsultancyAgency })
  }
  catch (error) {
    res.status(404).send('consultancy agency not found')
  }
})
router.put('/member/:id', async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      id: Joi.string()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    const id = req.params.id
    var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
    oldConsultancyAgency.consultancyAgencyMembers.push({
      id: req.body.id,
      name: req.body.name,
      date: new Date().toJSON()
    })
    oldConsultancyAgency.save()
    const returnedConsultancyAgency = await User.findOne({ '_id': id })
    if(req.body.id!= undefined){
      await User.findOneAndUpdate({ '_id': req.body.id ,tags :'Member' },{ $push:{memberWorksIn:{
        id:id,
        name:returnedConsultancyAgency.consultancyAgencyName,
        date: new Date().toJSON()
      }}})
    }
    res.json({ msg: 'Member added successfully', data: returnedConsultancyAgency })
  }
  catch (error) {
    res.status(404).send('consultancy agency not found')
  }
})
router.put('/partner/:id', async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      id: Joi.string()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    const id = req.params.id
    var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
    oldConsultancyAgency.consultancyAgencyPartners.push({
      id: req.body.id,
      name: req.body.name,
      date: new Date().toJSON()
    })
    oldConsultancyAgency.save()
    const returnedConsultancyAgency = await User.findOne({ '_id': id })
    if(req.body.id!= undefined){
      await User.findOneAndUpdate({ '_id': req.body.id ,tags :'Partner' },{ $push:{partnerPartners:{
        id:id,
        name:returnedConsultancyAgency.consultancyAgencyName,
        date: new Date().toJSON()
      }}})
    }
    res.json({ msg: 'Partner added successfully',  data: returnedConsultancyAgency })
  }
  catch (error) {
    res.status(404).send('consultancy agency not found')
  }
})

router.put('/event/:id', async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      id: Joi.string()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message })
    const id = req.params.id
    var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
    oldConsultancyAgency.consultancyAgencyEvents.push({
      id: req.body.id,
      name: req.body.name,
      date: new Date().toJSON()
    })
    await Platform.create({
      tags: ['Partner', 'Member', 'ConsultancyAgency', 'CoworkingSpace', 'EducationOrganization'],
      type: 'Event',
      date: new Date().toJSON(),
      owner: {
        id: req.params.id,
        name: oldConsultancyAgency.consultancyAgencyName
      },
      description:req.body.name
    })
    oldConsultancyAgency.save()
    const returnedConsultancyAgency = await User.findOne({ '_id': id })
    res.json({ msg: 'Event added successfully',data: returnedConsultancyAgency })
  }
  catch (error) {
    res.status(404).send({ error: result.error.details[0].message })
  }
=======
// End consultancyAgency CRUD 

// // Create a consultance to a task with id equal taskId by consultancy agency with id equal id
// // x
// router.post('/feedback/:id/:taskId', async (req, res) => {
//     try {
//         const id = req.params.id
//         const taskId = req.params.taskId
//         const isValidated = taskValidator.createConsaltedValidation(req.body)
//         if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
//         const consultedTask = await Task.findOne({
//             '_id': taskId,
//             'consultyNeeded': true,
//             'consultancyAgencyId': ''
//         })
//         if (!consultedTask) return res.status(404).json('task not found or don't need consultance')
//         const consult = new Consultance({
//             partnerId: consultedTask.partnerId,
//             consultancyAgencyId: id,
//             memberId: consultedTask.memberId,
//             adminId: consultedTask.adminId,
//             appliedId: consultedTask.appliedId,
//             description: req.body.description,
//             requiredSkills: req.body.requiredSkills,
//             monetaryCompensation: req.body.monetaryCompensation,
//             deadline: req.body.deadline,
//             deadlineForApply: consultedTask.deadlineForApply,
//             uploadDate: consultedTask.uploadDate,
//             submissionDate: consultedTask.submissionDate,
//             experienceLevel: req.body.experienceLevel,
//             commitLevel: req.body.commitLevel,
//             workCycle: consultedTask.workCycle,
//             linkOfTask: consultedTask.linkOfTask,
//             userRate: consultedTask.userRate,
//             accepted: consultedTask.accepted,
//             rate: consultedTask.rate,
//             consultyNeeded: consultedTask.consultyNeeded,
//             consultanciesDone: []
//         })
//         consultedTask.consultanciesDone.push(consult)
//         await Task.findOneAndUpdate({ '_id': taskId }, { 'consultanciesDone': consultedTask.consultanciesDone })
//         const taskAfterCounsultance = await Task.findOne({ '_id': taskId })
//         res.json({ data: taskAfterCounsultance})
//     }
//     catch (error) {
//         res.status(404).json('task not found or don't need consultance')
//     }
// })

//add report in agency with id equal id
// y
router.put('/Report/:id', async (req, res) => {
    try {
        const id = req.params.id
        var oldConsultancyAgency = await ConsultancyAgency.findOne({ '_id': id })
        if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
        oldConsultancyAgency.reports.push(req.body.report)
        await ConsultancyAgency.findOneAndUpdate({ '_id': id }, { 'reports': oldConsultancyAgency.reports })
        const returnedConsultancyAgency = await ConsultancyAgency.findOne({ '_id': id })
        res.json({ data: returnedConsultancyAgency })
    }
    catch (error) {
        res.status(404).send('consultancy agency not found')
    }
>>>>>>> master
})

//show all the tasks that need consultance 
//x
<<<<<<< HEAD
router.get('/task/consultyNeeded', async (req, res) => {
  try {
    const unconsulted = await Task.find({consultyNeeded: true,consultancyAgency: undefined})
    res.json({ data: unconsulted })
  }catch (error) {
    res.status(404).json('Error')
  }
})
router.get('/project/consultyNeeded', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const unconsulted = await Project.find({consultyNeeded: true,consultancyAgency: undefined})
    res.json({ data: unconsulted })
  }catch (error) {
    res.status(404).json('Error')
  }
})

router.put('/applyForTask/:id',  passport.authenticate('jwt', {session: false}),async (req, res) => {
  const consultancyAgencyId = req.params.id
  const taskId = req.body.taskId
  const task = await Task.findOne({ _id: taskId, consultyNeeded: true, consultancyAgency: undefined })
  if (task) {
    const consultancyAgency = await User.findOne({ _id: consultancyAgencyId, tags: 'ConsultancyAgency' })
    if (consultancyAgency) {
      if (task.accepted) {
        if (task.appliedConsultancies.filter(e => e.id == consultancyAgencyId).length > 0) return res.status(400).send('Applied Before')
        if (task.consultyNeeded) {
          if (task.appliedConsultancies === null) task.appliedConsultancies = []
          if (consultancyAgency.consultancyAgencyAppliedInTasks === null) consultancyAgency.consultancyAgencyAppliedInTasks = []
          await User.findByIdAndUpdate({ _id: consultancyAgencyId }, {$push: {consultancyAgencyAppliedInTasks:{
                name: task.name,
                id: task._id
              }}})
          await Task.findByIdAndUpdate({ _id: taskId }, {$push: {appliedConsultancies:{
                name: consultancyAgency.consultancyAgencyName,
                id: consultancyAgency._id
              }}})
          res.status(200).send('Done')
        } else res.status(400).send('Sorry u can not Apply the task Dont need consultancy')
      } else res.status(400).send('task  is not available')
    } else res.status(400).send('You are not consultancyAgency')  
  } else  res.status(400).send('This task has not yet been accepted')
  
})
router.put('/applyForProject/:id',  passport.authenticate('jwt', {session: false}),async (req, res) => {
  const consultancyAgencyId = req.params.id
  const projectId = req.body.projectId
  const project = await Project.findOne({ _id: projectId, consultyNeeded: true, consultancyAgency: undefined })

  if (project) {
    const consultancyAgency = await User.findOne({ _id: consultancyAgencyId, tags: 'ConsultancyAgency' })
    if (consultancyAgency) {
      if (project.accepted) {
        if (project.appliedConsultancies.filter(e => e.id == consultancyAgencyId).length > 0) return res.status(400).send('Applied Before')
        if (project.consultyNeeded) {
          if (project.appliedConsultancies == null) project.appliedConsultancies = []
          if (consultancyAgency.consultancyAgencyAppliedInPorjects == null) consultancyAgency.consultancyAgencyAppliedInPorjects = []
          await User.findByIdAndUpdate({ _id: consultancyAgencyId }, {$push: {consultancyAgencyAppliedInPorjects:{
                name: project.name,
                id: project._id,
                date: new Date().toJSON()
              }}})
          await Project.findByIdAndUpdate({ _id: projectId }, {$push: {appliedConsultancies:{
                name: consultancyAgency.consultancyAgencyName,
                id: consultancyAgency._id,
                date: new Date().toJSON()
              }}})
          res.status(200).send('Done')
        } else res.status(400).send('Sorry u can not Apply the project Dont need consultancy')
      }else  res.status(400).send('project  is not available')
    } else res.status(400).send('You are not consultancyAgency')   
  } else res.status(400).send('This project has not yet been accepted')
  
})

module.exports = router
=======
router.get('/UnconsultedTasks', async (req, res) => {
    try {
        const unconsulted = await Project.findOne({
            'consultyNeeded': true,
            'consultancyAgencyId': ''
        })
        res.json({ data: unconsulted })
    }
    catch (error) {
        res.status(404).json('Error')
    }
})

router.put('/applyForTask/:id', async (req, res) => {
    const  consultancyAgencyId= req.params.id
    const taskId = req.body.taskId
    const task = await Task.findById(taskId)
  
    if (task) {
      const consultancyAgency = await User.findOne({ _id: consultancyAgencyId, tags: 'ConsultancyAgency' })
      if (consultancyAgency) {
        if (task.accepted) {
          if (consultyNeeded) {
            if (task.appliedConsultancyAgencies === null) task.appliedConsultancyAgencies = []
            if (consultancyAgency.consultancyAgencyAppliedInTasks === null) consultancyAgency.consultancyAgencyAppliedInTasks = []
            await User.findByIdAndUpdate({ _id: consultancyAgencyId }, {
              $push: {
                consultancyAgencyAppliedInTasks:
                {
                  name: task.name,
                  id: task._id
                }
              }
            })
            await Task.findByIdAndUpdate({ _id: taskId }, {
              $push: {
                appliedConsultancyAgencies:
                {
                  name: consultancyAgency.consultancyAgencyName,
                  id: consultancyAgency._id
                }
              }
            })
            res.status(200).send('Done')
          } else {
            res.status(400).send('Sorry u can not Apply , u Dont have the required Specifications')
          }
        }
        else {
          res.status(400).send('task id is not available')
  
        }
      } else {
        res.status(400).send('member id is not available')
      }
    } else {
      res.status(400);
      res.send('This task has not yet been accepted')
    }
})
router.put('/applyForProject/:id', async (req, res) => {
    const consultancyAgencyId = req.params.id
    const projectId = req.body.projectId
    const project = await Project.findById(projectId)
  
    if (project) {
      const consultancyAgency = await User.findOne({ _id: consultancyAgencyId, tags: 'ConsultancyAgency' })
      if (consultancyAgency) {
        if (project.accepted) {

  
          if (consultyNeeded) {
            if (project.appliedConsultancies === null) project.appliedConsultancies = []
            if (consultancyAgency.consultancyAgencyAppliedInPorjects === null) consultancyAgency.consultancyAgencyAppliedInPorjects = []
            await User.findByIdAndUpdate({ _id: consultancyAgencyId }, {
              $push: {
                consultancyAgencyAppliedInPorjects:
                {
                  name: project.name,
                  id: project._id
                }
              }
            })
            await Project.findByIdAndUpdate({ _id: projectId }, {
              $push: {
                appliedConsultancies:
                {
                  name: consultancyAgency.consultancyAgencyName,
                  id: consultancyAgency._id
                }
              }
            })
            res.status(200).send('Done')
          } else {
            res.status(400).send('Sorry u can not Apply , u Dont have the required Specifications')
          }
        }
        else {
          res.status(400).send('project id is not available')
  
        }
      } else {
        res.status(400).send('consultancyAgency id is not available')
      }
    } else {
      res.status(400);
      res.send('This project has not yet been accepted')
    }
})
// // x
// router.put('/Task/:id/:taskId', async (req, res) => {
//     try {
//         const id = req.params.id
//         const taskId = req.params.taskId
//         const accpted=req.body.state
//         if(accpted){
//             const findTask = await Task.findOne({_id: taskId, 'taskConsultancyAgency.id': id})
//             const updatedTask = await Task.findOne({_id: taskId, 'taskConsultancyAgency.id': id},)

//         }

 
//         if (!findTask) return res.status(404).send('task not found')
//         const consultance = findTask.consultanciesDone.find(m => m.consultancyAgencyId == id)
//         if (!consultance) return findTask.status(404).send('consultance not found')
//         const index = findTask.consultanciesDone.indexOf(findTask.consultanciesDone.find(m => m.consultancyAgencyId == id))
//         const deletedConsultance = await findTask.consultanciesDone.splice(index, 1)
//         await Task.findOneAndUpdate({ '_id': taskId }, { 'consultanciesDone': findTask.consultanciesDone })
//         res.send({data: deletedConsultance})
//     }
//     catch (error) {
//         res.status(404).send('not found')
//     }
// })
module.exports = router
// // show certain consultancies for a certain task
// // (partner_id  => partnerId, task_id=>taskId,consultance_id+>ConsultancyAgencyId)
// // why
// router.get('/ConsultedTask/:partnerId/:taskId/:consultanceId', async (req, res) => {
//     try {
//         const consultedTask = await Task.findOne({
//             '_id': req.params.taskId,
//             'partnerId': req.params.partnerId
//         })
//         if (!consultedTask) return res.status(404).send('not found')
//         const consultance = consultedTask.consultanciesDone.find(consultancy => consultancy.consultancyAgencyId == req.params.consultanceId)
//         if (!consultance) return res.status(404).send('not found')
//         res.send({ data: consultance })
//     }
//     catch (error) {
//         res.status(404).send('not found')
//     }
// })
// // show all consultancies for a certain task
// // (partner_id  => partnerId, task_id=>taskId)
// // why
// router.get('/ConsultedTasks/:partnerId/:taskId', async (req, res) => {
//     try {
//         const ConsultedTasks = await Task.findOne({
//             '_id': req.params.taskId,
//             'partnerId': req.params.partnerId
//         })
//         if (!ConsultedTasks) {
//             res.status(404).send('not found')
//         }else{
//             res.send({ data: ConsultedTasks.consultanciesDone })
//         }
//     }
//     catch (error) {
//         res.status(404).send('not found')
//     }
// })
>>>>>>> master
