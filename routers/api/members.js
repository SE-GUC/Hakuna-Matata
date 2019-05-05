//Here
const express = require('express')
const router = express.Router();
const Joi = require('joi');
const passport = require('passport')


const User = require('../../models/User.js');
const Skill = require('../../models/Skill.js');
const Task = require('../../models/Task')
const Course = require('../../models/Course')
const MasterClass = require('../../models/MasterClass')
const Project = require('../../models/Project')
const { sendToAdminRequestNotification } = require('../../models/Notification.js')

// Member CRUD
// create member
router.post('/:id', async (req, res) => {
  const schema = {
    memberFullName: Joi.string().required(),
    skills: Joi.array().items()
  }
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send({ error: result.error.details[0].message })
  if(req.body.skills){
  for (var skill of req.body.skills) {
    var currSkills = await Skill.findOne(skill)
    if (!currSkills) return res.status(404).send(`${skill} is not supported by the site we will handel  that and send u notification`)
  }
  }
  const currUser = await User.findOne({ _id: req.params.id, tags: 'Member' })
  if (currUser) return res.status(404).send('You are already a Member on the site')

  const memberSchema = {
    memberFullName: req.body.memberFullName,
    memberWebName: req.body.memberFullName.split(' ')[0],
    completedTasksId: [],
    appliedTasksId: [],
    experienceLevel: 0,
    memberRating: 0,
    allRatedReco: 0,
    averageRecoRate: 0,
    allRatedTasks: 0,
    skills: req.body.skills,
    memberWorksIn: [],
    memberMasterclasses: [],
    memberCertificates: [],
    memberEvents: [],
    memberHirePerHour: 0,
    memberPhoneNumber: '',
    memberDateJoined: new Date().toJSON(),
    memberLocation: ''

  }
  await User.findByIdAndUpdate(req.params.id, memberSchema)
  await User.findByIdAndUpdate(req.params.id, { $push: { tags: 'Member' } })
  const member = await User.findById(req.params.id)
  res.json({ msg: 'Member Created successfully' ,data:member})

  res.send();

})
//get all members
router.get('/', async (req, res) => {
  const members = await User.find({ tags: 'Member' })
  res.json({ data: members })
})
//get Certin member
router.get('/:id', async (req, res) => {
  const member = await User.findOne({ _id: req.params.id, tags: 'Member' })
  res.json({ data: member })

})

router.put('/:id', async (req, res) => {
  const schema = {
    memberFullName: Joi.string()
  }
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send(result.error.details[0].message)
  try {
    const member = await User.findOneAndUpdate({ _id: req.params.id, tags: 'Member' }, { memberFullName: req.body.memberFullName })
    const updatedMember = await User.findById(req.params.id)
    res.json({ msg: 'Member updated successfully' })
    } catch (error) {

  }
})
// delete member 
// Delete Member delete 
router.delete('/:id', async (req, res) => {
  try {
    const currMember = await User.findOne({ _id: req.params.id, tags: 'Member' })
    if (currMember) {
      const index = currMember.tags.indexOf('Member')
      currMember.tags.splice(index, 1)
      currMember.save()
      res.json({ msg: 'Member was deleted successfully' })
    } else {
      res.json({ msg: 'Member was deleted Already or Not Found' })
    }
  }
  catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// End Member CRUD




router.put('/rate/:id',passport.authenticate('jwt', {session: false}), async (req, res) => {
  var id = req.params.id;
  const newRate = req.body.newRate;
  var noofTasks;
  const schema = {
    newRate: Joi.number().max(5).required(),
  }
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send({ error: result.error.details[0].message })

  var member = await User.findById(id)
  if (member !== null) {
    if (member.allRatedTasks == undefined || member.allRatedTasks == null) member.allRatedTasks = 0
    if (member.memberRating == undefined || member.memberRating == null) member.rating = 0
    noofTasks = member.allRatedTasks;
    const x = member.allRatedTasks + 1;
    var tempRate
    if ((((member.memberRating * noofTasks) + newRate) / x) > 5) tempRate = 5
    else
      tempRate = (((member.memberRating * noofTasks) + newRate) / x)

    member = await User.findOneAndUpdate({ '_id': id, tags: 'Member' }, { allRatedTasks: x, memberRating: tempRate })
    res.send('Done')
  } else {
    res.send('Not found')
  }
})
router.put('/applyForTask/:id', passport.authenticate('jwt', {session: false}),async (req, res) => {
  const memberId = req.params.id
  const taskId = req.body.taskId
  console.log(memberId)
  const task = await Task.findOne({ _id: taskId, accepted: true })
  if (task) {
    let member=null
    if(task.requiredSkills.length ===0) member = await User.findOne({ _id: memberId, tags: 'Member' })
    else member = await User.findOne({ _id: memberId, tags: 'Member', skills: { $all: task.requiredSkills } })
      if (member) {
      if (member.experienceLevel >= task.experienceLevel) {
        if (task.appliedMembers == undefined|| task.appliedMembers ==null) task.appliedMembers = []
        if ( member.appliedTasks ==undefined||member.appliedTasks == null) member.appliedTasks = []
        if (task.appliedMembers.filter(e => e.id == memberId).length > 0) return res.status(400).send({error:'Applied Before'})

        await User.findByIdAndUpdate({ _id: memberId }, {$push: {
          appliedInTasks:{
            name: task.name,
            id: task._id,
            date: new Date().toJSON()
          }
        }})
        await Task.findByIdAndUpdate({ _id: taskId }, {$push: {
            appliedMembers:{
              name: member.memberFullName,
              id: member._id,
              date: new Date().toJSON()
            }
          }})
          await User.findOneAndUpdate({ _id: memberId },{$push:{history:{
            action:'Apply For Task',
            name:{
              name: task.name,
              id: task._id,
            },
            date: new Date().toJSON()
        }}})
        res.status(200).json({msg :'Done'})
      } else {
        res.status(400).send({error:'Sorry u can not Apply , u Dont have the required Specifications'})
      }
    } else {
      res.status(400).send({error: 'Sorry u can not Apply , u Dont have the required Skills'})
    }
  } else {
    res.status(404).send({error:' task is not available'})
  }

})
router.put('/applyForProject/:id',passport.authenticate('jwt', {session: false}), async (req, res) => {
  const memberId = req.params.id
  const projectId = req.body.projectId
  const project = await Project.findOne({ _id: projectId, accepted: true })

  if (project) {
    let member=null
    if(project.requiredSkills.length ===0) member = await User.findOne({ _id: memberId, tags: 'Member' })
    else member = await User.findOne({ _id: memberId, tags: 'Member', skills: { $all: project.requiredSkills } })
    if (member) {
      if (member.experienceLevel >= project.experienceLevel) {
        if (project.appliedMembers == undefined|| project.appliedMembers ==null) project.appliedMembers = []
        if ( member.appliedProjects ==undefined||member.appliedProjects == null) member.appliedProjects = []
        if (project.appliedMembers.filter(e => e.id == memberId).length > 0) return res.status(400).send('Applied Before')

        await User.findByIdAndUpdate({ _id: memberId }, {$push: {
          appliedInProjects:{
            name: project.name,
            id: project._id,
            date: new Date().toJSON()
          }
        }})
        await Project.findByIdAndUpdate({ _id: projectId }, {$push: {
            appliedMembers:{
              name: member.memberFullName,
              id: member._id,
              date: new Date().toJSON()
            }
          }})
          await User.findOneAndUpdate({ _id: memberId },{$push:{history:{
            action:'Apply For Project',
            name:{
              name: project.name,
              id: project._id,
            },
            date: new Date().toJSON()
        }}})
        res.status(200).send('Done')
      } else {
        res.status(400).send({error:'Sorry u can not Apply , u Dont have the required Specifications'})
      }
    } else {
      res.status(400).send({error: 'Sorry u can not Apply , u Dont have the required Skills'})
    }
  } else {
    res.status(404).send({error: ' project is not available'})
  }

})

router.put('/applyForCourse/:id', passport.authenticate('jwt', {session: false}),async (request, response) => {
  const memberId = request.params.id;
  const courseId = request.body.courseId;
  const schema = {
    courseId: Joi.string().required()
  }
  const result = Joi.validate(request.body, schema);
  if (result.error) return response.status(400).send({ error: result.error.details[0].message });
  const course = await Course.findById(courseId)
  const member = await User.findOne({ _id: memberId, tags: 'Member' })
  //console.log(course)
  //console.log(member &course)

  if (member) {
    if (course) {
      if (course.availablePlaces > 0 & course.isAvailable) {
        if (course.listOfApplied == undefined) course.listOfApplied = []
        if (member.memberCoursesAppliedIn == undefined) member.memberCoursesAppliedIn = []
        if (course.listOfApplied.filter(e => e.id == memberId).length > 0) return res.status(400).send('Applied Before')

        course.listOfApplied.push({
          id: memberId,
          name: member.memberFullName,
          date: new Date().toJSON()
        })
        course.save()
        member.memberCoursesAppliedIn.push({
          id: course._id,
          name: course.name,
          date: new Date().toJSON()
        })
        await User.findOneAndUpdate({ _id: memberId },{$push:{history:{
          action:'Apply For Course',
          name:{
            id: course._id,
            name: course.name,
          },
          date: new Date().toJSON()
      }}})
        member.save()
        response.sendStatus(200);
      } else return response.status(404).send('this course is not availabe right now its Full');     
    } else return response.status(404).send('there is not such course in the site'); 
  } else return response.status(404).send('there is not such member in the site');
  
});
router.put('/applyForMasterClass/:id',passport.authenticate('jwt', {session: false}), async (req, res) => {
  const memberId = req.params.id;
  const masterClassId = req.body.masterClassId;
  const schema = {
    masterClassId: Joi.string().required()
  }
  const result = Joi.validate(req.body, schema);
  if (result.error) return response.status(400).send({ error: result.error.details[0].message });
  const masterClass = await MasterClass.findById(masterClassId)
  var member = await User.findOne({ _id: memberId, tags: 'Member' })
  if (member) {
    if (masterClass) {
      if (masterClass.availablePlaces > 0 & masterClass.isAvailable) {
        if (masterClass.listOfApplied == undefined) masterClass.listOfApplied = []
        if (member.memberMasterClassesAppliedIn == undefined) member.memberMasterClassesAppliedIn = []
        if (masterClass.listOfApplied.filter(e => e.id == memberId).length > 0) return res.status(400).send('Applied Before')

        masterClass.listOfApplied.push({
          id: memberId,
          name: member.memberFullName,
          date: new Date().toJSON()
        })
        masterClass.save()

        member.memberMasterclassesAppliedIn.push({
          id: masterClass._id,
          name: masterClass.name,
          date: new Date().toJSON()
        })
        await User.findOneAndUpdate({ _id: memberId },{$push:{history:{
          action:'Apply For Master Class',
          name:{
            id: masterClass._id,
            name: masterClass.name,
          },
          date: new Date().toJSON()
      }}})
        member.save()

        res.sendStatus(200);
      } else return res.status(404).send('this masterClass is not availabe right now its Full');
    } else return res.status(404).send('there is not such masterClass in the site');  
  } else return res.status(404).send('Your are not member in the site');

  
});
router.post('/editRequest/:id', (req, res) => {
  var id = req.params.id;
  var e = sendToAdminRequestNotification('Member ' + id + ' wants to edit his profile')
  res.sendStatus(200);
})
module.exports = router
