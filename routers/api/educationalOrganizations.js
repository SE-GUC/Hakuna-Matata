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
const MasterClass = require('../../models/masterClass.js')
const TrainingProgram = require('../../models/TrainingProgram.js')
const Certificate = require('../../models/Certificate.js')
const {Course}= require('../../models/Course.js')

// educationOrganization CRUD
router.post('/:id', async (request, response) => {
    try {
        const isValidated = educationOrganizationValidator.createValidation(request.body);
        if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })

        const currUser = await User.findOne({ _id: request.params.id, tags: 'EducationOrganization' })
        if (currUser) return response.status(404).send('You are already a EducationOrganization on the site')
        await User.findByIdAndUpdate(request.params.id, request.body)
        await User.findByIdAndUpdate(request.params.id, { educationOrganizationDateJoined: new Date().getDate() })
        await User.findByIdAndUpdate(request.params.id, { $push: { tags: 'EducationOrganization' } })
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
        const id = req.params.id
        const currEducationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        if (currEducationOrganization) {
            const index = currEducationOrganization.tags.indexOf('EducationOrganization')
            const deletedEducationOrganization = await User.findOneAndUpdate({ _id: id }, { tags: currEducationOrganization.tags.splice(index, 1) })
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
        if(educationOrganization){
           
            for(var index=0; index<educationOrganization.educationOrganizationCourses.length;index++){
                if(educationOrganization.educationOrganizationCourses[index].id == req.params.courseId){
                    var course= await Course.findById(req.params.courseId)
                     return res.send(course)
    
                }
            }
            return  res.status(404).send('Not found');
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
    if(educationOrganization){
    const isValidated = courseValidator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const course = await Course.create(req.body)
    course.educationalOrganization={ id:educationOrganization._id,
      name:educationOrganizationName.name
    }
    course.save()
        await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{$push:{educationOrganizationCourses:{
           id:course._id,
           name:course.name
        }}})
        educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        res.send(educationOrganization.educationOrganizationCourses)
}else{
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
    if(educationOrganization){
        var courses=educationOrganization.educationOrganizationCourses
        for(var index=0; index<courses.length;index++){
            if(courses[index].id===req.params.courseId){
                educationOrganization.educationOrganizationCourses.splice(index,1)
                courses=educationOrganization.educationOrganizationCourses
                 educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{educationOrganizationCourses:courses})
                 await Course.findByIdAndRemove(req.params.courseId)
                 return res.send(educationOrganization.educationOrganizationCourses)

            }
        }
        return  res.status(404).send('Not found');
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
        if(educationOrganization){
           
            for(var index=0; index<educationOrganization.educationOrganizationMasterClasses.length;index++){
                if(educationOrganization.educationOrganizationMasterClasses[index].id==req.params.masterClassId){
                    var masterClass= await MasterClass.findById(req.params.masterClassId)
                     return res.send(masterClass)
    
                }
            }
            return  res.status(404).send('Not found');
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
    if(educationOrganization){
    const isValidated = masterClassValidator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const masterClass = await MasterClass.create(req.body)
        await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{$push:{educationOrganizationMasterClasses:{
           id:masterClass._id,
           name:masterClass.name
        }}})
        educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        res.send(educationOrganization.educationOrganizationMasterClasses)
}else{
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
    if(educationOrganization){
        var masterClasses=educationOrganization.educationOrganizationMasterClasses
        for(var index=0; index<masterClasses.length;index++){
            if(masterClasses[index].id===req.params.masterClassId){
                educationOrganization.educationOrganizationMasterClasses.splice(index,1)
                masterClasses=educationOrganization.educationOrganizationMasterClasses
                 educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{educationOrganizationMasterClasses:masterClasses})
                 await MasterClass.findByIdAndRemove(req.params.masterClassId)
                 return res.send(educationOrganization.educationOrganizationMasterClasses)

            }
        }
        return  res.status(404).send('Not found');
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
        if(educationOrganization){
           
            for(var index=0; index<educationOrganization.educationOrganizationEducators.length;index++){
                if(educationOrganization.educationOrganizationEducators[index].id==req.params.educatorId){
                    var educator= await User.findById(req.params.educatorId)
                     return res.send(educator)
    
                }
            }
            return  res.status(404).send('Not found');
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
    if(educationOrganization){
    const isValidated = educatorValidator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    //
    //const educator = await Educator.create(req.body)
        await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{$push:{educationOrganizationEducators:{
           id:req.body._id,
           name:req.body.name
        }}})
        await User.findOneAndUpdate({ _id: req.body._id},{$push:{memberWorksIn:{
          id:educationOrganization._id,
          name:educationOrganization.name
       }}})
        educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        res.send(educationOrganization.educationOrganizationEducators)
}else{
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
    if(educationOrganization){
        var educatores=educationOrganization.educationOrganizationEducators
        for(var index=0; index<educatores.length;index++){
            if(educatores[index].id===req.params.educatorId){
                educationOrganization.educationOrganizationEducators.splice(index,1)
                educators=educationOrganization.educationOrganizationEducators
                 educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{educationOrganizationEducators:educators})
                 //await Educator.findByIdAndRemove(req.params.educatorId)
                 return res.send(educationOrganization.educationOrganizationEducatores)

            }
        }
        return  res.status(404).send('Not found');
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
        if(educationOrganization){
           
            for(var index=0; index<educationOrganization.educationOrganizationCertificates.length;index++){
                if(educationOrganization.educationOrganizationCertificates[index].id===req.params.certificateId){
                    var certificate= await Certificate.findById(req.params.certificateId)
                     return res.send(certificate)
    
                }
            }
            return  res.status(404).send('Not found');
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
    if(educationOrganization){
    const isValidated = certificateValidator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const certificate = await Certificate.create(req.body)
        await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{$push:{educationOrganizationCertificates:{
           id:certificate._id,
           name:certificate.name
        }}})
        educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        res.send(educationOrganization.educationOrganizationCertificates)
}else{
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
    if(educationOrganization){
        var certificates=educationOrganization.educationOrganizationCertificates
        for(var index=0; index<certificates.length;index++){
            if(certificates[index].id===req.params.certificateId){
                educationOrganization.educationOrganizationCertificates.splice(index,1)
                certificates=educationOrganization.educationOrganizationCertificates
                 educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{educationOrganizationCertificates:certificates})
                 await Certificate.findByIdAndRemove(req.params.certificateId)
                 return res.send(educationOrganization.educationOrganizationCertificates)

            }
        }
        return  res.status(404).send('Not found');
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
        var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        if(educationOrganization){
           
            for(var index=0; index<educationOrganization.educationOrganizationTrainingPrograms.length;index++){
                if(educationOrganization.educationOrganizationTrainingPrograms[index].id===req.params.trainingProgramId){
                    var trainingProgram= await TrainingProgram.findById(req.params.trainingProgramId)
                     return res.send(trainingProgram)
    
                }
            }
            return  res.status(404).send('Not found');
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
    if(educationOrganization){
    const isValidated = trainingProgramValidator.createValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const trainingProgram = await TrainingProgram.create(req.body)
        await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{$push:{educationOrganizationTrainingPrograms:{
           id:trainingProgram._id,
           name:trainingProgram.name
        }}})
        educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
        res.send(educationOrganization.educationOrganizationTrainingPrograms)
}else{
    res.status(404).send('Not found');

}

  } catch (error) {
    
    res.sendStatus(404).send('Not found');
  }
});
//delete trainingProgram using mongo
router.delete('/trainingProgram/:id/:trainingProgramId', async (req, res) => {
  try {
    var educationOrganization = await User.findOne({ _id: req.params.id, tags: 'EducationOrganization' })
    if(educationOrganization){
        var trainingPrograms=educationOrganization.educationOrganizationTrainingPrograms
        for(var index=0; index<trainingPrograms.length;index++){
            if(trainingPrograms[index].id===req.params.trainingProgramId){
                educationOrganization.educationOrganizationTrainingPrograms.splice(index,1)
                trainingPrograms=educationOrganization.educationOrganizationTrainingPrograms
                 educationOrganization = await User.findOneAndUpdate({ _id: req.params.id, tags: 'EducationOrganization' },{educationOrganizationTrainingPrograms:trainingPrograms})
                 await TrainingProgram.findByIdAndRemove(req.params.trainingProgramId)
                 return res.send(educationOrganization.educationOrganizationTrainingPrograms)

            }
        }
        return  res.status(404).send('Not found');
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
router.put('/acceptMemberInCourse/:id',async (req, res) => {
    const educationOrganizationId=req.params.id
    const memberId=req.body.memberId
    const courseId=req.body.courseId
    const state=req.body.state
    const course= await Course.findById(courseId);
    if(course & course.educationalOrganization.id===educationOrganizationId){
        const member= await User.findone({_id:memberId,tags:'Member'})
        if(member){
            for(var index=0;course.listOfApplied.length;index++){
                if(course.listOfApplied[index].id===memberId){
                    course.listOfApplied.splice(index,1)
                    index--;
                }
            }
           
            for(var index=0;member.memberCoursesAppliedIn.length;index++){
                if(member.memberCoursesAppliedIn[index].id===courseId){
                    member.memberCoursesAppliedIn.splice(index,1)
                    index--;
                }
            }
            
            if(course.availablePlaces>0&state){
             
                member.memberCoursesAcceptedIn.push({
                    id: course._id,
                    name: course.name,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a')
                  })
                  member.save()
                  course.listOfAccepted.push({
                    id: memberId,
                    name: member.memberFullName,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a')
                  })
                  course.availablePlaces--;
                  course.save()
                  return res.status(200).send('Done')
            }else{
                course.save()
                member.save()
                if(!state) return res.status(200).send('Should send Notification for the member')
                return res.status(200).send('No available Places')
            }
        }else{
            if(!member)return res.status(404).send('member not Found')
            
        }
    }
  });
  
  router.put('/acceptMemberInMasterClass/:id',async (req, res) => {
    const educationOrganizationId=req.params.id
    const memberId=req.body.memberId
    const masterClassId=req.body.masterClassId
    const state=req.body.state
    const masterClass= await MasterClass.findById(masterClassId);
    if(masterClass & masterClass.educationalOrganization.id===educationOrganizationId){
        const member= await User.findone({_id:memberId,tags:'Member'})
        if(member){
            for(var index=0;masterClass.listOfApplied.length;index++){
                if(masterClass.listOfApplied[index].id===memberId){
                    masterClass.listOfApplied.splice(index,1)
                    index--;
                }
            }
           
            for(var index=0;member.memberMasterClassesAppliedIn.length;index++){
                if(member.memberMasterClassesAppliedIn[index].id===masterClassId){
                    member.memberMasterClassesAppliedIn.splice(index,1)
                    index--;
                }
            }
            
            if(masterClass.availablePlaces>0&state){
             
                member.memberMasterClassesAcceptedIn.push({
                    id: masterClass._id,
                    name: masterClass.name,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a')
                  })
                  member.save()
                  masterClass.listOfAccepted.push({
                    id: memberId,
                    name: member.memberFullName,
                    date: moment().format('MMMM Do YYYY, h:mm:ss a')
                  })
                  masterClass.availablePlaces--;
                  masterClass.save()
                  return res.status(200).send('Done')
            }else{
                masterClass.save()
                member.save()
                if(!state) return res.status(200).send('Should send Notification for the member')
                return res.status(200).send('No available Places')
            }
        }else{
            if(!member)return res.status(404).send('member not Found')
            
        }
    }
  });

module.exports = router;