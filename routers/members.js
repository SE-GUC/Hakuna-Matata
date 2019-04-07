const express = require('express')
const router = express.Router();
const Joi = require('joi');
const { Member } = require('../models/Member.js');

const Project = require('../models/Project.js');
const projectValidator = require('../validations/projectValidations.js')

const notObject = require('../models/Notification.js');
// Member CRUD
// create member
// changed request instead of req
router.post('/', async (request, response) => {
  const schema = {
    fullName: Joi.string().required(),
    skills: Joi.array().items(Joi.string())
  }
  const result = Joi.validate(request.body, schema);
  if (result.error) {
    return response.status(400).send({ error: result.error.details[0].message })
  } else {
    const fullName = request.body.fullName;
    var splitted = fullName.split(" ");
    var webName = splitted[0];
    const skills = request.body.skills;
    const member = new Member({

      fullName: fullName,
      webName: webName,
      completedTaskId: [],
      appliedTaskId: [],
      levelOfExperience: 0,
      Rating: 0,
      allRatedReco: 0,
      averageRecoRate: 0,
      allRatedTasks: 0,
      skills: skills

    })
    await member.save();
    response.send(member);
  }
})
// Get all members
router.get('/', async (req, res) => {
  await Member.find({}, function (err, members) {
    if (!err) {
      res.send(members);
    } else {
      res.status(404).send('Not found')
    }
  })
})
// get member by id
router.get('/:id', async (req, res) => {
  await Member.findById(req.params.id, function (err, members) {
    if (!err) {
      if (members !== null) {
        res.send(members);
      } else {
        res.send('Not found')
      }
    } else {
      res.status(404).send('Not found')
    }
  })
})

// update member name and skills
router.put("/:id", async (req, res) => {
  const schema = {
    fullName: Joi.string().required(),
  }
  const result = Joi.validate(req.body, schema);
  if (result.error) return res.status(400).send(result.error.details[0].message)

  try {
    const member = await Member.findByIdAndUpdate(req.params.id, { fullName: req.body.fullName })
    const updatedMember = await Member.findById(req.params.id)
    res.send(updatedMember)
  } catch (error) {

  }
})
// delete member 
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletedMember = await Member.findOneAndRemove({ "_id": id })
    if (deletedMember !== null) {
      res.json({ msg: 'Member was deleted successfully', data: deletedMember })
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

//create project
router.post('/project/:id', async (request, response) => {
  try {
    const isValidated = projectValidator.createValidation(request.body);
    if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })
    const project = new Project({
      taskId: request.body.taskId,
      partnerId: request.body.partnerId,
      memberId: request.params.id,
      link: request.body.link
    })
    await project.save()
    response.sendStatus(200)
  } catch (error) {
    // We will be handling the error later
    response.status(404).send("Not found")
  }
})
// get project by member id
router.get('/project/:id/', (req, res) => {
  var temp = [];
  Project.find({}, function (err, projects) {
    if (!err) {
      for (var i = 0; i < projects.length; i++) {
        if (projects[i].memberId == req.params.id) {
          temp.push(projects[i])
        }
      }
      res.send(temp)
    } else {
      res.status(404).send('Not found')
    }
  })
})
// delete project 
router.delete('/project/:id/:projectId', function (req, res) {
  Project.findById(req.params.projectId, function (err, project) {
    if (!err) {
      if (project.memberId == req.params.id) {
        Project.findByIdAndRemove(
          req.params.projectId,
          function (err) {
            if (!err) {
              res.sendStatus(200)
            } else {
              res.status(404).send('Not found')
            }
          }
        )
      } else {
        res.status(404).send('not allowed to delete this project')
      }
    } else {
      res.status(404).send('Error!')
    }
  })
})
// update project 
router.put("/project/:id/:projectId", (req, res) => {
  const schema = {

    link: Joi.string().required(),

  }
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return
  }
  Project.findById(req.params.projectId, function (err, project) {
    if (!err) {
      if (project.memberId == req.params.id) {
        project.link = req.body.link
        project.save()
        res.send(project)
      } else {
        res.status(404).send('not allowed to delete this project')
      }
    } else {
      res.status(404).send('Error!')
    }
  })
})
// Badr Part
// update rating (id =>memberId)
router.put('/rate/:id', async (req, res) => {
  var id = req.params.id;
  const newRate = req.body.newRate;
  var noofTasks;
  const schema = {
    newRate: Joi.number().integer().max(5).required(),
  }
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send({ error: result.error.details[0].message })
  }
  var object = await Member.findById(id)
  if (object !== null) {
    if (object.allRatedTasks == null)
      object.allRatedTasks = []
    if (object.rating == undefined)
      object.rating = 0
    noofTasks = object.allRatedTasks;
    const x = object.allRatedTasks + 1;
    var tempRate
    if (Math.round(((object.rating * noofTasks) + newRate) / x) > 5) {
      tempRate = 5
    } else {
      tempRate = Math.round(((object.rating * noofTasks) + newRate) / x)
    }
    object = await Member.findOneAndUpdate({ "_id": id }, { "allRatedTasks": x, "rating": tempRate })
    res.sendStatus(200)
  } else {
    res.send("Not found")
  }
})
//2
router.put('/applyForTask/:id', async (req, res) => {
  const memberId = req.params.id
  const taskId = req.body.taskId
  const task = await Task.findById(taskId)
  
  if (task !== null) {
    const member = await Member.findById(memberId)
  

    if (member !== null) {
      if (task.accepted) {
        var matches = 0
        for (var requires of task.requiredSkills) {
          for (var memberskill of member.skills) {
            if ((memberskill) === (requires)) {
              matches++
            }
          }
        }
        console.log(matches)
        console.log(task.requiredSkills.length)
        console.log( member.levelOfExperience)
        console.log(task.experienceLevel)
        if (matches >= task.requiredSkills.length & member.levelOfExperience >= task.experienceLevel) {
          if (task.appliedId === null) {
            task.appliedId = []
          }
          task.appliedId.push(member._id)
          if (member.appliedTaskId === null) {
            member.appliedTaskId = []
          }
          member.appliedTaskId.push(task._id)
          member.save()
          task.save()
          res.send(member)
        } else {
          res.status(400);
          res.send("Sorry u can not Apply , u Dont have the required Specifications")
        }
      }
       else {
        res.status(400).send("task id is not available")
        
      }
    } else {
      res.status(400).send("member id is not available")
    }
  } else {
    res.status(400);
    res.send('This task has not yet been accepted')
  }
})
//2
router.post('/editRequest/:id', (request, response) => {
  var id = request.params.id;
  var e = notObject.sendToAdminRequestNotification("Member " + id + " wants to edit his profile")
  response.sendStatus(200);
})
// End Badr Part
module.exports = router
