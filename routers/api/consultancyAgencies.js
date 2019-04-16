const express = require('express')
const router = express.Router()
const Joi = require('joi');

const User = require('../../models/User')
const consultancyAgencyValidator = require('../../validations/consultancyAgencyValidations.js')
const Task = require('../../models/Task')
const Project = require('../../models/Project')


// consultancyAgency CRUD
router.post('/:id', async (request, response) => {
    try {
        const isValidated = consultancyAgencyValidator.createValidation(request.body);
        if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })
        const currUser = await User.findOne({ _id: request.params.id, tags: 'ConsultancyAgency' })
        if (currUser) return response.status(404).send('You are already a ConsultancyAgency on the site')    
        await User.findByIdAndUpdate(request.params.id, request.body)
        await User.findByIdAndUpdate(request.params.id, { consultancyAgencyDateJoined:new Date().toJSON() ,$push: { tags: 'ConsultancyAgency' }})      
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
    if (!consultancyAgency) return res.status(404).send({ error: 'ConsultancyAgency does not exist' })
    res.json({ data: consultancyAgency })

})
// update ConsultancyAgency name 
router.put('/:id', async (req, res) => {
    const isValidated = consultancyAgencyValidator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

    try {
        const consultancyAgency = await User.findOneAndUpdate({ _id: req.params.id, tags: 'ConsultancyAgency' }, req.body)
        if (!consultancyAgency) return res.status(404).send({ error: 'ConsultancyAgency does not exist' })
        const updatedConsultancyAgency = await User.findById(req.params.id)
        res.send(updatedConsultancyAgency)
    } catch (error) {
      response.status(404).send('error')

    }
})
// delete ConsultancyAgency 
// Delete ConsultancyAgency delete 
router.delete('/:id', async (req, res) => {
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
        response.status(404).send('error')
    }
})




//add report in agency with id equal id
// y
router.put('/Report/:id', async (req, res) => {
    try {
      const schema = {
        report: Joi.string().required(),
      }
      const result = Joi.validate(req.body, schema);
      if (result.error)  return res.status(400).send({ error: result.error.details[0].message })
      const id = req.params.id
      var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
      if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
      oldConsultancyAgency.consultancyAgencyReports.push({
        info:req.body.report,
        postDate: new Date().toJSON()
      })
      oldConsultancyAgency.save()
      const returnedConsultancyAgency = await User.findOne({ '_id': id })
      res.json({ data: returnedConsultancyAgency })
    }
    catch (error) {
        res.status(404).send('consultancy agency not found')
    }
})
router.put('/Member/:id', async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      id: Joi.string()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error)  return res.status(400).send({ error: result.error.details[0].message })
    const id = req.params.id
    var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
    oldConsultancyAgency.consultancyAgencyMembers.push({
      id:req.body.id,
      name:req.body.name,
      date: new Date().toJSON()
    })
    oldConsultancyAgency.save()
    const returnedConsultancyAgency = await User.findOne({ '_id': id })
    res.json({ data: returnedConsultancyAgency })
  }
  catch (error) {
      res.status(404).send('consultancy agency not found')
  }
})
router.put('/Partner/:id', async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      id: Joi.string()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error)  return res.status(400).send({ error: result.error.details[0].message })
    const id = req.params.id
    var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
    if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
    oldConsultancyAgency.consultancyAgencyPartners.push({
      id:req.body.id,
      name:req.body.name,
      date: new Date().toJSON()
    })
    oldConsultancyAgency.save()
    const returnedConsultancyAgency = await User.findOne({ '_id': id })
    res.json({ data: returnedConsultancyAgency })
  }
  catch (error) {
      res.status(404).send('consultancy agency not found')
  }
})
router.put('/Event/:id', async (req, res) => {
  try {
    const schema = {
      name: Joi.string().required(),
      id: Joi.string()
    }
    const result = Joi.validate(req.body, schema);
    if (result.error)  return res.status(400).send({ error: result.error.details[0].message })
      const id = req.params.id
      var oldConsultancyAgency = await User.findOne({ _id: req.params.id, tags: 'ConsultancyAgency' })
      if (!oldConsultancyAgency) return res.status(404).send('consultancy agency not found')
      oldConsultancyAgency.consultancyAgencyEvents.push({
        id:req.body.id,
        name:req.body.name,
        date: new Date().toJSON()
      })
      oldConsultancyAgency.save()
      const returnedConsultancyAgency = await User.findOne({ '_id': id })
      res.json({ data: returnedConsultancyAgency })
  }
  catch (error) {
      res.status(404).send({ error: result.error.details[0].message })
  }
})

//show all the tasks that need consultance 
//x
router.get('/Task/consultyNeeded', async (req, res) => {
    try {
        const unconsulted = await Task.find({
          consultyNeeded: true,
          consultancyAgency: undefined
        })
        
        res.json({ data: unconsulted })
    }
    catch (error) {
        res.status(404).json('Error')
    }
})
router.get('/Project/consultyNeeded', async (req, res) => {
  try {
      const unconsulted = await Project.find({
          consultyNeeded: true,
          consultancyAgency: undefined
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
    const task = await Task.findOne({_id:taskId,consultyNeeded: true,consultancyAgency: undefined})
  
    if (task) {
      const consultancyAgency = await User.findOne({ _id: consultancyAgencyId, tags: 'ConsultancyAgency' })
      if (consultancyAgency) {
        if (task.accepted) {
          if (task.appliedConsultancies.filter(e => e.id == consultancyAgencyId).length > 0) return res.status(400).send('Applied Before')
          if (task.consultyNeeded) {
            if (task.appliedConsultancies === null) task.appliedConsultancies = []
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
                appliedConsultancies:
                {
                  name: consultancyAgency.consultancyAgencyName,
                  id: consultancyAgency._id
                }
              }
            })
            res.status(200).send('Done')
          } else {
            res.status(400).send('Sorry u can not Apply the task Dont need consultancy')
          }
        }
        else {
          res.status(400).send('task id is not available')
  
        }
      } else {
        res.status(400).send('You are not consultancyAgency')
      }
    } else {
      res.status(400).send('This task has not yet been accepted')
    }
})
router.put('/applyForProject/:id', async (req, res) => {
    const consultancyAgencyId = req.params.id
    const projectId = req.body.projectId
    const project = await Project.findOne( {_id:projectId,consultyNeeded: true,consultancyAgency: undefined})
  
    if (project) {
      const consultancyAgency = await User.findOne({ _id: consultancyAgencyId, tags: 'ConsultancyAgency' })
      if (consultancyAgency) {
        if (project.accepted) {
          if (project.appliedConsultancies.filter(e => e.id == consultancyAgencyId).length > 0) return res.status(400).send('Applied Before')

          
          if (project.consultyNeeded) {
            if (project.appliedConsultancies == null) project.appliedConsultancies = []
            if (consultancyAgency.consultancyAgencyAppliedInPorjects == null) consultancyAgency.consultancyAgencyAppliedInPorjects = []
            await User.findByIdAndUpdate({ _id: consultancyAgencyId }, {
              $push: {
                consultancyAgencyAppliedInPorjects:
                {
                  name: project.name,
                  id: project._id,
                  date:new Date().toJSON()
                }
              }
            })
            await Project.findByIdAndUpdate({ _id: projectId }, {
              $push: {
                appliedConsultancies:
                {
                  name: consultancyAgency.consultancyAgencyName,
                  id: consultancyAgency._id,
                  date:new Date().toJSON()

                }
              }
            })
            res.status(200).send('Done')
          } else {
            res.status(400).send('Sorry u can not Apply the project Dont need consultancy')
          }
        }
        else {
          res.status(400).send('project id is not available')
  
        }
      } else {
        res.status(400).send('You are not consultancyAgency')
      }
    } else {
      res.status(400).send('This project has not yet been accepted')
    }
})

module.exports = router
