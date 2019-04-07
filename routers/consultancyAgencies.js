const express = require('express')
const router = express.Router()

const consultancyAgency = require('../models/ConsultancyAgency')
const consultancyAgencyValidator = require('../validations/consultancyAgencyValidations.js')

const Consultance = require('../models/Consultance')
const Task = require('../models/Task')
const taskValidator = require('../validations/taskValidations.js')


// CRUD
// Create agency
router.post('/:partnerId', async (req, res) => {
    try {
        const isValidated = consultancyAgencyValidator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        req.body.partners.push(req.params.partnerId)
        const newConsultancyAgency = new consultancyAgency({
            name: req.body.name,
            rate: null,
            information: req.body.information,
            partners: req.body.partners,
            members: req.body.members,
            reports: req.body.reports
          })
        await consultancyAgency.insertMany(newConsultancyAgency)
        res.json({ msg: 'ConsultancyAgency was created successfully', data: newConsultancyAgency })
    }
    catch (error) {
        res.status(404).send('not found')
    }
})

// Read all agencies
router.get('/', async (req, res) => {
    const consultancyAgencies = await ConsultancyAgency.find()
    res.json({ data: consultancyAgencies })
})

// Read agency with id equal id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        var consultancyAgency = await ConsultancyAgency.findById({ "_id": id })
        if (!consultancyAgency) res.status(404).send('consultancy agency not found')
        res.json({ data: consultancyAgency })
    }
    catch (error) {
        res.status(404).send('consultancy agency not found')
    }
})

// Update agency with id equal id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        var consultancyAgency = await ConsultancyAgency.findOne({ "_id": id })
        if (!consultancyAgency) return res.status(404).send({ error: 'consultancyAgency does not exist' })

        const isValidated = consultancyAgencyValidator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        await ConsultancyAgency.findOneAndUpdate({ '_id': id }, req.body)
        const updatedConsultancyAgency = await ConsultancyAgency.findOne({ '_id': id })
        res.json({ msg: 'ConsultancyAgency updated successfully' , data: updatedConsultancyAgency })
    }
    catch (error) {
        res.status(404).send('ConsultancyAgency not found')
    }
})

// Delete agency with id equal agency_id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        var deletedConsultancyAgency = await ConsultancyAgency.findByIdAndRemove(id)
        if (!deletedConsultancyAgency) return res.status(404).send("consultancy agency not found")
        res.json({ msg: 'ConsultancyAgency was deleted successfully', data: deletedConsultancyAgency })
    }
    catch (error) {
        res.status(404).send("consultancy agency not found")
    }
})
// End CRUD

// Create a consultance to a task with id equal taskId by consultancy agency with id equal id
// x
router.post('/feedback/:id/:taskId', async (req, res) => {
    try {
        const id = req.params.id
        const taskId = req.params.taskId
        const isValidated = taskValidator.createConsaltedValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const consultedTask = await Task.findOne({
            '_id': taskId,
            'consultyNeeded': true,
            'consultancyAgencyId': ""
        })
        if (!consultedTask) return res.status(404).json("task not found or don't need consultance")
        const consult = new Consultance({
            partnerId: consultedTask.partnerId,
            consultancyAgencyId: id,
            memberId: consultedTask.memberId,
            adminId: consultedTask.adminId,
            appliedId: consultedTask.appliedId,
            description: req.body.description,
            requiredSkills: req.body.requiredSkills,
            monetaryCompensation: req.body.monetaryCompensation,
            deadline: req.body.deadline,
            deadlineForApply: consultedTask.deadlineForApply,
            uploadDate: consultedTask.uploadDate,
            submissionDate: consultedTask.submissionDate,
            experienceLevel: req.body.experienceLevel,
            commitLevel: req.body.commitLevel,
            workCycle: consultedTask.workCycle,
            linkOfTask: consultedTask.linkOfTask,
            userRate: consultedTask.userRate,
            accepted: consultedTask.accepted,
            rate: consultedTask.rate,
            consultyNeeded: consultedTask.consultyNeeded,
            consultanciesDone: []
        })
        consultedTask.consultanciesDone.push(consult)
        await Task.findOneAndUpdate({ '_id': taskId }, { 'consultanciesDone': consultedTask.consultanciesDone })
        const taskAfterCounsultance = await Task.findOne({ '_id': taskId })
        res.json({ data: taskAfterCounsultance})
    }
    catch (error) {
        res.status(404).json("task not found or don't need consultance")
    }
})

//add report in agency with id equal id
//x
router.put('/addReport/:id', async (req, res) => {
    try {
        const id = req.params.id
        var oldConsultancyAgency = await ConsultancyAgency.findOne({ '_id': id })
        if (!oldConsultancyAgency) return res.status(404).send("consultancy agency not found")
        oldConsultancyAgency.reports.push(req.body.report)
        await ConsultancyAgency.findOneAndUpdate({ '_id': id }, { 'reports': oldConsultancyAgency.reports })
        const returnedConsultancyAgency = await ConsultancyAgency.findOne({ '_id': id })
        res.json( { data: returnedConsultancyAgency})
    }
    catch (error) {
        res.status(404).send("consultancy agency not found")
    }
})

//show all the tasks that need consultance 
//x
router.get('/UnconsultedTasks', async (req, res) => {
    try {
        const unconsulted = await Task.findOne({
            'consultyNeeded': true,
            'consultancyAgencyId': ""
        })
        res.json({ data: returnedConsultancyAgency})
    }
    catch (error) {
        res.status(404).json('no task found')
    }
})
// show all consultancies for a certain task
// (partner_id  => partnerId, task_id=>taskId)
// y
router.get('/ConsultedTasks/:partnerId/:taskId', async (req, res) => {
    try {
        const ConsultedTasks = await Task.findOne({
            '_id': req.params.taskId,
            'partnerId': req.params.partnerId
        })
        if (!ConsultedTasks) {
            res.status(404).send("not found")
        }else{
            res.send({ data: ConsultedTasks.consultanciesDone })
        }
    }
    catch (error) {
        res.status(404).send("not found")
    }
})

// show certain consultancies for a certain task
// (partner_id  => partnerId, task_id=>taskId,consultance_id+>ConsultancyAgencyId)
// x
router.get('/ConsultedTask/:partnerId/:taskId/:consultanceId', async (req, res) => {
    try {
        const consultedTask = await Task.findOne({
            '_id': req.params.taskId,
            'partnerId': req.params.partnerId
        })
        if (!consultedTask) return res.status(404).send("not found")
        const consultance = consultedTask.consultanciesDone.find(consultancy => consultancy.consultancyAgencyId == req.params.consultanceId)
        if (!consultance) return res.status(404).send("not found")
        res.send({ data: consultance })
    }
    catch (error) {
        res.status(404).send("not found")
    }
})

// (id  => constultancyAgencysId, partner_id  => partnerId, task_id=>taskId,)
// y
router.put('/acceptConsultedTask/:id/:partnerId/:taskId', async (req, res) => {
    try {
        const acceptedTask = await Task.findOne({
            '_id': req.params.taskId,
            'partnerId': req.params.partnerId
        })
        if (acceptedTask != null) {
            const consultance = acceptedTask.consultanciesDone.find(consultancy => consultancy.consultancyAgencyId == req.params.id)
            if (!consultance) return res.status(404).send("consultance not found")
            const consult = new Task({
                partnerId: consultance.partnerId,
                consultancyAgencyId: consultance.consultancyAgencyId,
                memberId: consultance.memberId,
                adminId: consultance.adminId,
                appliedId: consultance.appliedId,
                description: consultance.description,
                requiredSkills: consultance.requiredSkills,
                monetaryCompensation: consultance.monetaryCompensation,
                deadline: consultance.deadline,
                deadlineForApply: consultance.deadlineForApply,
                uploadDate: consultance.uploadDate,
                submissionDate: consultance.submissionDate,
                experienceLevel: consultance.experienceLevel,
                commitLevel: consultance.commitLevel,
                workCycle: consultance.workCycle,
                linkOfTask: consultance.linkOfTask,
                userRate: consultance.userRate,
                accepted: consultance.accepted,
                rate: consultance.rate,
                consultyNeeded: consultance.consultyNeeded,
                consultanciesDone: acceptedTask.consultanciesDone
            })
            // May case prob change Form task to Task
            Task.insertMany(consult)
            //var e = Send_Task_Notification(req.params.taskId, consultance.consultancyAgencyId, "Your consultancy has been accepted!")
            await Task.findByIdAndDelete(req.params.taskId)
            res.send({ data: consult})
            // End of prob
        }
        else {
            return  res.status(404).send("task not found")          
        }
    }
    catch (error) {
        res.status(404).send("task not found")
    }

})

// update consultance to a certain task
// (id=> consultancyAgencysId,task_id=>partenerId)
// x
router.put('/updateConsultance/:id/:taskId', async (req, res) => {
    try {
        const findTask = await Task.findOne({
            '_id': req.params.taskId,
        })
        if (!findTask) return  res.status(404).send('task not found')
        const consultance = findTask.consultanciesDone.find(consultancy => consultancy.consultancyAgencyId == req.params.id)
        if (!consultance) return res.status(404).send('consultance not found')
        const isValidated = taskValidator.updateConsaltedValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message }) 

        if (req.body.description != null) consultance.description = req.body.description
        if (req.body.requiredSkills != null) consultance.requiredSkills = req.body.requiredSkills
        if (req.body.monetaryCompensation != null)  consultance.monetaryCompensation = req.body.monetaryCompensation
        if (req.body.deadline != null) consultance.deadline = req.body.deadline
        if (req.body.deadlineForApply != null) consultance.deadlineForApply = req.body.deadlineForApply
        if (req.body.experienceLevel != null) consultance.experienceLevel = req.body.experienceLevel
        if (req.body.commitLevel != null) consultance.commitLevel = req.body.commitLevel
        

        await Task.findOneAndUpdate({ '_id': req.params.taskId }, { 'consultanciesDone': findTask.consultanciesDone })
        const taS = await Task.findOne({ '_id': req.params.taskId })
        res.send({ data: taS.consultanciesDone.find(consultancy => consultancy.consultancyAgencyId == req.params.id)})
    }
    catch (error) {
        res.status(404).send("not found")
    }
})

// Delete certain consultance of a task
// x
router.delete('/consultance/:id/:taskId', async (req, res) => {
    try {
        const id = req.params.id
        const taskId = req.params.taskId
        const findTask = await Task.findOne({
            '_id': taskId,
        })
        if (!findTask) return res.status(404).send('task not found')
        const consultance = findTask.consultanciesDone.find(m => m.consultancyAgencyId == id)
        if (!consultance) return findTask.status(404).send('consultance not found')
        const index = findTask.consultanciesDone.indexOf(findTask.consultanciesDone.find(m => m.consultancyAgencyId == id))
        const deletedConsultance = await findTask.consultanciesDone.splice(index, 1)
        await Task.findOneAndUpdate({ '_id': taskId }, { 'consultanciesDone': findTask.consultanciesDone })
        res.send({data: deletedConsultance})
    }
    catch (error) {
        res.status(404).send('not found')
    }
})
module.exports = router