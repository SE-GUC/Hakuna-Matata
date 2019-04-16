const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const partnerValidator = require('../../validations/partnerValidations.js')

 const { sendToAdminRequestNotification,NotSummary } = require('../../models/Notification.js')

// Partner CRUD
router.post('/:id', async (req, res) => {
    try {
        const isValidated = partnerValidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        
            const currUser = await User.findOne({ _id: req.params.id, tags: 'Partner' })
            if (currUser) return res.status(404).send('You are already a Partner on the site')
            await User.findByIdAndUpdate(req.params.id ,req.body)
            await User.findByIdAndUpdate(req.params.id ,{partnerDateJoined:new Date().getDate()})
            await User.findByIdAndUpdate(req.params.id,{$push:{tags:'Partner'}})
            // console.log(3)
            const partner = await User.findById(req.params.id)
            res.send(partner);
          
    } catch (err) {
        // We will be handling the error later
        res.status(404).send('error')
    }  
    })


  //get all Partners
  router.get('/', async (req, res) => {
    const partners = await User.find({ tags: 'Partner' })
    res.json({ data: partners })
  })
  //get Certin partner
  router.get('/:id', async (req,res) => {
    const partner = await User.findOne({_id:req.params.id ,tags: 'Partner' })
    res.json({ data: partner })
  
  })
  
  // update partner name 
  router.put('/:id', async (req, res) => {
    const isValidated = partnerValidator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
  
    try {
      const partner = await User.findOneAndUpdate({_id:req.params.id ,tags: 'Partner' } ,req.body)
      const updatedPartner = await User.findById(req.params.id)
      res.send(updatedPartner)
    } catch (error) {
  
    }
  })
  // delete Partner 
  // Delete Partner delete 
  router.delete('/:id', async (req, res) => {
    try {
      const currPartner = await User.findOne({_id:req.params.id ,tags: 'Partner' })     
      if (currPartner) {
        const index=currPartner.tags.indexOf('Partner')
       currPartner.tags.splice(index,1)
       currPartner.save()
        res.json({ msg: 'Partner was deleted successfully'})
      } else {
        res.json({ msg: 'Partner was deleted Already or Not Found' })
      }
    }
    catch (error) {
      // We will be handling the error later
      console.log(error)
    }
  })
// End Partner CRUD



  // get partner projects
router.get('/project/:id', async (req,res) => {
    const partner = await User.findOne({_id:req.params.id ,tags: 'Partner' })
    res.send( partner.partnerProjects)
  
})
  // get partner projects
  router.get('/task/:id', async (req,res) => {
    const partner = await User.findOne({_id:req.params.id ,tags: 'Partner' })
    res.send( partner.partnerTasks)
  
})
//1
router.get('/acceptedTask/:id', async (req, res) => {
  const not = await NotSummary.find({ 'sent_to': req.params.id, 'title': 'Your task has been accepted' });
  res.send( not);
})
//3
router.get('/assignedTask/:id', async (req, res) => {
  const not = await NotSummary.find({ 'sent_to': req.params.id, 'title': 'You task has been assigned to a member!' });
  res.send({
    data: not
  })
})
//1
router.post('/editRequest/:id', (req, res) => {
  var id = req.params.id
  var e = sendToAdminRequestNotification('Partner ' + id + ' wants to edit his profile')
  res.sendStatus(200)
})

  
//s
router.put('/assignConstlancyAgencyToTask/:id', async (req, res) => {
  const partnerId=req.params.id
  const taskId=req.body.taskId
  const consultancyAgencyId=req.body.consultancyAgencyId
  var task =await Task.findOne({_id:taskId, accepted:true})
  if(task){
    if(task.taskPartner.id===partnerId){
      const assignedConsultancyAgency=await User.findOne({_id:consultancyAgencyId, tags:'ConsultancyAgency' })
      for(var consultancyAgency of  task.appliedConsultancies){
        if(consultancyAgency.id===consultancyAgencyId){
          task.consultancyAgency=consultancyAgency
          assignedConsultancyAgency.consultancyAgencyAcceptedInTasks.push({
            id:task._id,
            name:task.name,
            date:new Date().getDate()
          })
        }
      }
      //Should be Remove from PlateForm and notify consultancy
      task.save()
      assignedConsultancyAgency.save()

    }else{
      res.status(404).send('You are not the owner')

    }
  }else{
    res.status(404).send('this task not found')
  }
})
router.put('/assignConstlancyAgencyToProject/:id', async (req, res) => {
  const partnerId=req.params.id
  const projectId=req.body.projectId
  const consultancyAgencyId=req.body.consultancyAgencyId
  var project =await Project.findOne({_id:projectId, accepted:true})
  if(project){
    if(project.projectPartner.id===partnerId){
      const assignedConsultancyAgency=await User.findOne({_id:consultancyAgencyId, tags:'ConsultancyAgency' })
      for(var consultancyAgency of  project.appliedConsultancies){
        if(consultancyAgency.id===consultancyAgencyId){
          project.consultancyAgency=consultancyAgency
          assignedConsultancyAgency.consultancyAgencyAcceptedInPorjects.push({
            id:project._id,
            name:project.name,
            date:new Date().getDate()
          })
        }
      }
      //Should be Remove from PlateForm and notify consultancy
      project.save()
      assignedConsultancyAgency.save()

    }else{
      res.status(404).send('You are not the owner')

    }
  }else{
    res.status(404).send('this porject not found')
  }
})


module.exports = router;