const express = require('express')
const router = express.Router()
router.use(express.json())
const courseValidator = require('../../validations/courseValidations.js')
const masterClassValidator = require('../../validations/masterClassValidations.js')
const trainingProgramValidator = require('../../validations/trainingProgramsValidations.js')
const educationOrganizationValidator = require('../../validations/educationalOrganizationValidations.js')
const educatorValidator = require('../../validations/educatorValidations.js')
const certificateValidator = require('../../validations/certificateValidations.js')

const User = require('../../models/User.js')
const MasterClass = require('../../models/MasterClass.js')
const TrainingProgram = require('../../models/TrainingProgram.js')
const Certificate = require('../../models/Certificate.js')
const Course = require('../../models/Course.js')

// educationOrganization CRUD
router.post('/:id', async (request, response) => {
  try {
    const isValidated = educationOrganizationValidator.createValidation(request.body);
    if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })

    const currUser = await User.findOne({ _id: request.params.id, tags: 'EducationOrganization' })
    if (currUser) return response.status(404).send('You are already a EducationOrganization on the site')
    await User.findByIdAndUpdate(request.params.id, request.body)
    await User.findByIdAndUpdate(request.params.id, { educationOrganizationDateJoined: new Date().getDate(), $push: { tags: 'EducationOrganization' } })
    const educationOrganization = await User.findById(request.params.id)
    response.send(educationOrganization);

  } catch (err) {
    // We will be handling the error later
    response.status(404).send('error')
  }
})
//get all educationOrganizations
router.get('/', async (req, res) => {
  const educationOrganizations = await User.find({ tags: 'EducationOrganization' })
  res.json({ data: educationOrganizations })
})
//get Certin EducationOrganization
router.get('/:id', async (req, res) => {
  const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
  res.json({ data: educationOrganization })

})
// update EducationOrganization name 
router.put('/:id', async (req, res) => {
  const isValidated = educationOrganizationValidator.updateValidation(req.body);
  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

  try {
    const educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, req.body)
    const updatedEducationOrganization = await User.findById(req.params.id)
    res.send(updatedEducationOrganization)
  } catch (error) {

  }
})
// delete EducationOrganization 
// Delete EducationOrganization delete 
router.delete('/:id', async (req, res) => {
  try {
    const currEducationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (currEducationOrganization) {
      const index = currEducationOrganization.tags.indexOf('EducationOrganization')
      const deletedEducationOrganization = currEducationOrganization.tags.splice(index, 1)
      currEducationOrganization.save()
      res.json({ msg: 'EducationOrganization was deleted successfully', data: deletedEducationOrganization })
    } else {
      res.json({ msg: 'EducationOrganization was deleted Already or Not Found' })
    }
  }
  catch (error) {
    // We will be handling the error later
    console.log(error)
  }
})
// End educationOrganization CRUD 

// Course CRUDS
// get all Courses of One EducationalOrganizationId
router.get('/course/:id', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    res.json({ data: educationOrganization.educationOrganizationCourses })
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//get course of specific educational organization
router.get('/course/:id/:courseId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const index = educationOrganization.educationOrganizationCourses.findIndex((course) => course.id == req.params.courseId)
      educationOrganization.save()
      if(index!=-1){
        const returnedCourse= await Course.findById(req.params.courseId)
        return res.send(returnedCourse)
      }
      // for (var index = 0; index < educationOrganization.educationOrganizationCourses.length; index++) {
      //   if (educationOrganization.educationOrganizationCourses[index].id == req.params.courseId) {
      //     var course = await Course.findById(req.params.courseId)
      //     return res.send(course)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//Create Course for educations_orgization
router.post('/course/:id', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const isValidated = courseValidator.createValidation(req.body);
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      const course = await Course.create(req.body)
      course.educationalOrganization = {
        id: educationOrganization._id,
        name: educationOrganization.educationOrganizationName,
        date: new Date().toJSON()
      }
      course.save()
      await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, {
        $push: {
          educationOrganizationCourses: {
            id: course._id,
            name: course.name,
            date: new Date().toJSON()

          }
        }
      })
      educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
      res.send(educationOrganization.educationOrganizationCourses)
    } else {
      res.status(404).send('Not found');

    }

  } catch (error) {

    res.sendStatus(404).send('Not found');
  }
});
//delete course using mongo
router.delete('/course/:id/:courseId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const oldLength=educationOrganization.educationOrganizationCourses.length
      educationOrganization.educationOrganizationCourses = educationOrganization.educationOrganizationCourses.filter((course) => course.id != req.params.courseId)
      educationOrganization.save()
      await Course.findByIdAndRemove(req.params.courseId)
      if(oldLength>educationOrganization.educationOrganizationCourses.length) return res.send(educationOrganization.educationOrganizationCourses)
      // var courses = educationOrganization.educationOrganizationCourses
      // for (var index = 0; index < courses.length; index++) {
      //   if (courses[index].id == req.params.courseId) {
      //     educationOrganization.educationOrganizationCourses.splice(index, 1)
      //     courses = educationOrganization.educationOrganizationCourses
      //     educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, { educationOrganizationCourses: courses })
      //     await Course.findByIdAndRemove(req.params.courseId)
      //     return res.send(educationOrganization.educationOrganizationCourses)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});

//End of Course CRUDS

// MasterClass CRUD
router.get('/masterClass/:id', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    res.json({ data: educationOrganization.educationOrganizationMasterClasses })
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//get masterClass of specific educational organization
router.get('/masterClass/:id/:masterClassId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const index = educationOrganization.educationOrganizationMasterClasses.findIndex((masterClass) => masterClass.id == req.params.masterClassId)
      educationOrganization.save()
      if(index!=-1){
        const returnedMasterClass= await MasterClass.findById(req.params.masterClassId)
        return res.send(returnedMasterClass)
      }
      // for (var index = 0; index < educationOrganization.educationOrganizationMasterClasses.length; index++) {
      //   if (educationOrganization.educationOrganizationMasterClasses[index].id == req.params.masterClassId) {
      //     var masterClass = await MasterClass.findById(req.params.masterClassId)
      //     return res.send(masterClass)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//Create MasterClass for educations_orgization
router.post('/masterClass/:id', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const isValidated = masterClassValidator.createValidation(req.body);
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      const masterClass = await MasterClass.create(req.body)
      masterClass.educationalOrganization = {
        id: educationOrganization._id,
        name: educationOrganization.educationOrganizationName,
        date: new Date().toJSON()
      }
      masterClass.save()
      await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, {
        $push: {
          educationOrganizationMasterClasses: {
            id: masterClass._id,
            name: masterClass.name,
            date: new Date().toJSON()

          }
        }
      })
      educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
      res.send(educationOrganization.educationOrganizationMasterClasses)
    } else {
      res.status(404).send('Not found');

    }

  } catch (error) {

    res.sendStatus(404).send('Not found');
  }
});
//delete masterClass using mongo
router.delete('/masterClass/:id/:masterClassId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const oldLength=educationOrganization.educationOrganizationMasterClasses.length
      educationOrganization.educationOrganizationMasterClasses = educationOrganization.educationOrganizationMasterClasses.filter((masterClass) => masterClass.id != req.params.masterClassId)
      educationOrganization.save()
      await MasterClass.findByIdAndRemove(req.params.masterClassId)
      if(oldLength>educationOrganization.educationOrganizationMasterClasses.length) return res.send(educationOrganization.educationOrganizationMasterClasses)
      // var masterClasses = educationOrganization.educationOrganizationMasterClasses
      // for (var index = 0; index < masterClasses.length; index++) {
      //   if (masterClasses[index].id == req.params.masterClassId) {
      //     educationOrganization.educationOrganizationMasterClasses.splice(index, 1)
      //     masterClasses = educationOrganization.educationOrganizationMasterClasses
      //     educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, { educationOrganizationMasterClasses: masterClasses })
      //     await MasterClass.findByIdAndRemove(req.params.masterClassId)
      //     return res.send(educationOrganization.educationOrganizationMasterClasses)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
// End Master Class CRUD

//  Educator CRUD
router.get('/educator/:id', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    res.json({ data: educationOrganization.educationOrganizationEducators })
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//get educator of specific educational organization
router.get('/educator/:id/:educatorId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const index = educationOrganization.educationOrganizationEducators.findIndex((educator) => educator.id == req.params.educatorId)
      educationOrganization.save()
      if(index!=-1){
        const returnedEducator= await User.findById(req.params.educatorId)
        return res.send(returnedEducator)
      }
      //await User.findByIdAndRemove(req.params.educatorId)
      // for (var index = 0; index < educationOrganization.educationOrganizationEducators.length; index++) {
      //   if (educationOrganization.educationOrganizationEducators[index].id == req.params.educatorId) {
      //     var educator = await User.findById(req.params.educatorId)
      //     return res.send(educator)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//Create Educator for educations_orgization
router.post('/educator/:id', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const isValidated = educatorValidator.createValidation(req.body);
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      //
      //const educator = await Educator.create(req.body)
      await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, {
        $push: {
          educationOrganizationEducators: {
            id: req.body._id,
            name: req.body.name,
            date: new Date().toJSON()

          }
        }
      })
      await User.findOneAndUpdate({ _id: req.body._id }, {
        $push: {
          memberWorksIn: {
            id: educationOrganization._id,
            name: educationOrganization.name,
            date: new Date().toJSON()

          }
        }
      })
      educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
      res.send(educationOrganization.educationOrganizationEducators)
    } else {
      res.status(404).send('Not found');

    }

  } catch (error) {

    res.sendStatus(404).send('Not found');
  }
});
//delete educator using mongo
router.delete('/educator/:id/:educatorId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const oldLength=educationOrganization.educationOrganizationEducators.length
      educationOrganization.educationOrganizationEducators = educationOrganization.educationOrganizationEducators.filter((educator) => educator.id != req.params.educatorId)
      educationOrganization.save()
      //await Certificate.findByIdAndRemove(req.params.educatorId)
      if(oldLength>educationOrganization.educationOrganizationEducators.length) return res.send(educationOrganization.educationOrganizationEducators)
      // var educationOrganizationEducators = educationOrganization.educationOrganizationEducators
      // for (var index = 0; index < educatores.length; index++) {
      //   if (educatores[index].id == req.params.educatorId) {
      //     educationOrganization.educationOrganizationEducators.splice(index, 1)
      //     educators = educationOrganization.educationOrganizationEducators
      //     educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, { educationOrganizationEducators: educators })
      //     //await Educator.findByIdAndRemove(req.params.educatorId)
      //     return res.send(educationOrganization.educationOrganizationEducatores)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
// End Educator CRUD



// Certificant CRUD
// get all Certificates of One EducationalOrganizationId
router.get('/certificate/:id', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    res.json({ data: educationOrganization.educationOrganizationCertificates })
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//get certificate of specific educational organization
router.get('/certificate/:id/:certificateId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const index = educationOrganization.educationOrganizationCertificates.findIndex((certificate) => certificate.id == req.params.certificateId)
      educationOrganization.save()
      if(index!=-1){
        const returnedCertificate= await Certificate.findById(req.params.certificateId)
        return res.send(returnedCertificate)
      }
      await Certificate.findByIdAndRemove(req.params.certificateId)
      // for (var index = 0; index < educationOrganization.educationOrganizationCertificates.length; index++) {
      //   if (educationOrganization.educationOrganizationCertificates[index].id == req.params.certificateId) {
      //     var certificate = await Certificate.findById(req.params.certificateId)
      //     return res.send(certificate)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//Create Certificate for educations_orgization
router.post('/certificate/:id', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const isValidated = certificateValidator.createValidation(req.body);
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      const certificate = await Certificate.create(req.body)
      certificate.educationalOrganization = {
        id: educationOrganization._id,
        name: educationOrganization.educationOrganizationName,
        date: new Date().toJSON()
      }
      certificate.save()
      await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, {
        $push: {
          educationOrganizationCertificates: {
            id: certificate._id,
            name: certificate.name,
            date: new Date().toJSON()

          }
        }
      })
      educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
      res.send(educationOrganization.educationOrganizationCertificates)
    } else {
      res.status(404).send('Not found');

    }

  } catch (error) {

    res.sendStatus(404).send('Not found');
  }
});
//delete certificate using mongo
router.delete('/certificate/:id/:certificateId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const oldLength=educationOrganization.educationOrganizationCertificates.length
      educationOrganization.educationOrganizationCertificates = educationOrganization.educationOrganizationCertificates.filter((certificate) => certificate.id != req.params.certificateId)
      educationOrganization.save()
      await Certificate.findByIdAndRemove(req.params.certificateId)
      if(oldLength>educationOrganization.educationOrganizationCertificates.length) return res.send(educationOrganization.educationOrganizationCertificates)

      // var certificates = educationOrganization.educationOrganizationCertificates
      // for (var index = 0; index < certificates.length; index++) {
      //   if (certificates[index].id == req.params.certificateId) {
      //     const deledtCertificate = educationOrganization.educationOrganizationCertificates.splice(index, 1)
      //     certificates = educationOrganization.educationOrganizationCertificates
      //     educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, { educationOrganizationCertificates: certificates })
      //     await Certificate.findByIdAndRemove(req.params.certificateId)
      //     return res.send(educationOrganization.educationOrganizationCertificates)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//End Certificant CRUD


// Training Program CRUD
// get all TrainingPrograms of One EducationalOrganizationId
router.get('/trainingProgram/:id', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    res.json({ data: educationOrganization.educationOrganizationTrainingPrograms })
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//get trainingProgram of specific educational organization
router.get('/trainingProgram/:id/:trainingProgramId', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const index = educationOrganization.educationOrganizationTrainingPrograms.findIndex((trainingProgram) => trainingProgram.id == req.params.trainingProgramId)
      educationOrganization.save()
      if(index!=-1){
        const returnedTrainingProgram = await TrainingProgram.findById(req.params.trainingProgramId)
        return res.send(returnedTrainingProgram)
      }
      await TrainingProgram.findByIdAndRemove(req.params.trainingProgramId)
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
//Create TrainingProgram for educations_orgization
router.post('/trainingProgram/:id', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
      const isValidated = trainingProgramValidator.createValidation(req.body);
      if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
      const trainingProgram = await TrainingProgram.create(req.body)
      trainingProgram.educationalOrganization = {
        id: educationOrganization._id,
        name: educationOrganization.educationOrganizationName,
        date: new Date().toJSON()
      }
      trainingProgram.save()
      await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, {
        $push: {
          educationOrganizationTrainingPrograms: {
            id: trainingProgram._id,
            name: trainingProgram.name,
            date: new Date().toJSON()

          }
        }
      })
      educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
      res.send(educationOrganization.educationOrganizationTrainingPrograms)
    } else {
      res.status(404).send('Not found');

    }

  } catch (error) {

    res.sendStatus(404).send('Not found');
  }
});
//delete trainingProgram using mongo
router.delete('/trainingProgram/:id/:trainingProgramId', async (req, res) => {
  try {
    const educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if (educationOrganization) {
        const oldLength=educationOrganization.educationOrganizationTrainingPrograms.length
        educationOrganization.educationOrganizationTrainingPrograms = educationOrganization.educationOrganizationTrainingPrograms.filter((trainingProgram) => trainingProgram.id != req.params.trainingProgramId)
        educationOrganization.save()
        await TrainingProgram.findByIdAndRemove(req.params.trainingProgramId)
        if(oldLength>educationOrganization.educationOrganizationTrainingPrograms.length) return res.send(educationOrganization.educationOrganizationTrainingPrograms)

      // for (var index = 0; index < trainingPrograms.length; index++) {
      //   if (trainingPrograms[index].id == req.params.trainingProgramId) {
      //     educationOrganization.educationOrganizationTrainingPrograms.splice(index, 1)
      //     trainingPrograms = educationOrganization.educationOrganizationTrainingPrograms
      //     educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' }, { educationOrganizationTrainingPrograms: trainingPrograms })
      //     await TrainingProgram.findByIdAndRemove(req.params.trainingProgramId)
      //     return res.send(educationOrganization.educationOrganizationTrainingPrograms)

      //   }
      // }
      return res.status(404).send('Not found');
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(404).send('Not found');
  }
});
// End Training Program CRUD



//1
//accept member for course
//(id  => EducationalOrganizationId  ,course_id => courseId,memberId=>studentId)
router.put('/acceptMemberInCourse/:id', async (req, res) => {
  const educationOrganizationId = req.params.id
  const memberId = req.body.memberId
  const courseId = req.body.courseId
  const state = req.body.state
  const course = await Course.findById(courseId);
  if (course != undefined & course.educationalOrganization.id == educationOrganizationId) {
    const member = await User.findone({ _id: memberId, tags: 'Member' })
    if (member) {

      if (course.listOfApplied == undefined) course.listOfApplied = []
      if (member.memberCoursesAppliedIn == undefined) member.memberCoursesAppliedIn = []
      course.listOfApplied = course.listOfApplied.filter((member) => member.id != memberId)
      member.memberCoursesAppliedIn = member.memberCoursesAppliedIn.filter((course) => course.id != courseId)
      
      // for (var index = 0; course.listOfApplied.length; index++) {
      //   if (course.listOfApplied[index].id == memberId) {
      //     course.listOfApplied.splice(index, 1)
      //     index--;
      //   }
      // }

      // for (var index = 0; member.memberCoursesAppliedIn.length; index++) {
      //   if (member.memberCoursesAppliedIn[index].id == courseId) {
      //     member.memberCoursesAppliedIn.splice(index, 1)
      //     index--;
      //   }
      // }

      if (course.availablePlaces > 0 & state) {

        member.memberCoursesAcceptedIn.push({
          id: course._id,
          name: course.name,
          date: new Date().toJSON()
        })
        member.save()
        course.listOfAccepted.push({
          id: memberId,
          name: member.memberFullName,
          date: new Date().toJSON()
        })
        course.availablePlaces--;
        course.save()
        return res.status(200).send('Done')
      } else {
        course.save()
        member.save()
        if (!state) return res.status(200).send('Should send Notification for the member')
        return res.status(200).send('No available Places')
      }
    } else {
      if (!member) return res.status(404).send('member not Found')

    }
  } else {
    if (!course) return res.status(404).send('course not Found')
  }
});

router.put('/acceptMemberInMasterClass/:id', async (req, res) => {
  const educationOrganizationId = req.params.id
  const memberId = req.body.memberId
  const masterClassId = req.body.masterClassId
  const state = req.body.state
  const masterClass = await MasterClass.findById(masterClassId);

  if (masterClass != undefined & masterClass.educationalOrganization.id == educationOrganizationId) {
    const member = await User.findOne({ _id: memberId, tags: 'Member' })

    if (member) {
      if (masterClass.listOfApplied == undefined) masterClass.listOfApplied = []
      if (member.memberMasterClassesAppliedIn == undefined) member.memberMasterClassesAppliedIn = []
      masterClass.listOfApplied = masterClass.listOfApplied.filter((member) => member.id != memberId)
      member.memberMasterClassesAppliedIn = member.memberMasterClassesAppliedIn.filter((masterClass) => masterClass.id != masterClassId)


      if (masterClass.availablePlaces > 0 & state == true) {
        if (member.memberMasterClassesAcceptedIn == undefined) member.memberMasterClassesAcceptedIn = []
        member.memberMasterClassesAcceptedIn.push({
          id: masterClass._id,
          name: masterClass.name,
          date: new Date().toJSON()
        })
        member.save()
        if (masterClass.listOfAccepted == undefined) masterClass.listOfAccepted = []
        masterClass.listOfAccepted.push({
          id: memberId,
          name: member.memberFullName,
          date: new Date().toJSON()
        })
        masterClass.availablePlaces--;
        masterClass.save()

        return res.status(200).send('Done')
      } else {
        masterClass.save()
        member.save()
        if (!state) return res.status(200).send('Should send Notification for the member')
        return res.status(200).send('No available Places')
      }
    } else {
      if (!member) return res.status(404).send('member not Found')

    }
  } else {
    if (!masterClass) return res.status(404).send('masterClass not Found')
  }
});

module.exports = router;