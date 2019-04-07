const express = require('express')
const router = express.Router()

const Partner = require('../models/Partner')
const partnerValidator = require('../validations/partnerValidations.js')

const { sendToAdminRequestNotification } = require('../models/Notification.js')

// Partner CRUD
// create a partner
router.post('/', async (request, response) => {
  try {
    const isValidated = partnerValidator.createValidation(request.body);
    if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })
    const partner = await Partner.create(request.body)
    response.sendStatus(200)
} catch (error) {
    // We will be handling the error later
    response.status(404).send("Not found")
}  
})
// get all partners
router.get('/', async (req, res) => {
  await Partner.find({}, function (err, partners) {
    if (!err) {
      res.send(partners)
    } else {
      res.status(404).send('Not found');

    }
  })

})
// get partner by id
router.get('/:id', async (req, res) => {
  await Partner.findById(req.params.id, function (err, partners) {
    if (!err) {
      res.send(partners);
    } else {
      res.status(404).send('Not found')
    }
  })


})
// update a partner
router.put("/:id", async (req, res) => {
try{
  const isValidated = partnerValidator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
  await Partner.findById(req.params.id, function (err, partners) {
    if (!err) {
      if (req.body.name != null) {
        partners.name = req.body.name
      } if (req.body.information != null) {
        partners.information = req.body.information
      } if (req.body.partners != null) {
        partners.partners = req.body.partners
      } if (req.body.fieldOfWork != null) {
        partners.fieldOfWork = req.body.fieldOfWork
      } if (req.body.projects != null) {
        partners.projects = req.body.projects
      } if (req.body.feedbackForm != null) {
        partners.feedbackForm = req.body.feedbackForm
      }
      const result = partners.save()
      res.send(partners)
    } else {
      res.status(404).send('Not found')
    }
  })
}catch(err){
  console.log(err)
}
})
// delete partner
router.delete('/:id', async function (req, res) {
  try {
    const id = req.params.id
    const deletedPartner = await Partner.findOneAndRemove({ "_id": id })
    if (deletedPartner !== null) {
      res.json({ msg: 'Partner was deleted successfully', data: deletedPartner })
    } else {
      // res.json({msg:'Partner was deleted Already or Not Found'})
      res.status(404).send('Not found');
    }
  }
  catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// End of Partner
// get partner project
router.get('/project/:id/', async (req, res) => {
  await Partner.findOne({ "_id": req.params.id }, function (err, tPartner) {
    if (!err) {
      if (tPartner !== null) {
        res.send(tPartner.projects);
      } else {
        res.send("Not Found")
      }
    } else {
      res.status(404).send('Not found')
    }
  })
})
//badr
//1
router.get('acceptedTask/:id', async (request, response) => {
  const not = await Not_summary.find({ "sent_to": request.params.id, "title": "Your task has been accepted" });
  response.send({
    data: not
  });
});
//1
router.get('assignedTask/:id', async (request, response) => {
  const not = await Not_summary.find({ "sent_to": request.params.id, "title": "You task has been assigned to a member!" });
  response.send({
    data: not
  })
});
//1
router.post('/editRequest/:id', (request, response) => {
  var id = request.params.id
  var e = sendToAdminRequestNotification("Partner " + id + " wants to edit his profile")
  response.sendStatus(200)
});

//show my project (id =>partnerId)
//1
/*
router.get('/project/:id', async (req, res) => {
  const projects = await Project.find({
    partnerId: req.params.id
  })
  if (projects.length == 0)
    res.send("You don't have projects")
  else
    res.send({
      data: projects
    })
});*/
// end badr
module.exports = router;