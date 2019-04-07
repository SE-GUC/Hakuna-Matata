const express = require("express")
const router = express.Router()
router.use(express.json())

const courseValidator = require("../validations/courseValidations.js")
const masterClassValidator = require('../validations/masterClassValidations.js')
const trainingProgramValidator = require('../validations/trainingProgramsValidations.js')
const educationalOrganiztionValidator = require("../validations/educationalOrganizationValidations.js")
const educatorValidator = require('../validations/educatorValidations.js')
const certificateValidator = require('../validations/certificateValidations.js')

const EducationalOrganization = require("../models/EducationalOrganization.js")
const MasterClass = require("../models/masterClass.js")
const TrainingProgram = require("../models/TrainingProgram.js")
const Certificate = require("../models/Certificate.js")
const Educator = require("../models/Educator.js")
const Courses = require("../models/Course.js")
//create educational organization
//same as 
router.post("/:id", async (req, res) => {
  try {
    req.body.partnerId = parseInt(req.params.id);
    const isValidated = educationalOrganiztionValidator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const educationalOrganization = await EducationalOrganization.create(req.body);

    res.json({
      msg: "EducationalOrganization was created successfully",
      data: educationalOrganization
    });
  } catch (error) {
    res.status(404).send("Not found");
  }
});
//get all educational organization
router.get("/", async (req, res) => {
  try {
    const educationalOrganization = await EducationalOrganization.find();
    if (!educationalOrganization)
      return res.status(404).send({ error: "EducationalOrganization does not exist" });
    res.json({
      msg: " EducationalOrganization",
      data: educationalOrganization
    });
  } catch (error) {
    res.status(404).send("Not found");
  }
});
//get one  educational organization using mongo
//(id  => EducationalOrganizationId)
//1
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const educationalOrganization = await EducationalOrganization.findById(id);
    if (!educationalOrganization)
      return res
        .status(404)
        .send({ error: "EducationalOrganization does not exist" });
    res.json({ msg: "You get the EducationalOrganization", data: educationalOrganization });
  } catch (error) {
    res.status(404).send("Not found");
  }
});
//(id  => educationalOrganizationId)
//1
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const educationalOrganization = await EducationalOrganization.findById(id);
    if (!educationalOrganization)
      return res.status(404).send({ error: "organization does not exist" });
    const isValidated = educationalOrganiztionValidator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const educationalOrganizationUpdated = await EducationalOrganization.findOneAndUpdate(
      { _id: id },
      req.body
    );

    res.json({
      msg: "You update EducationalOrganization",
      data: educationalOrganizationUpdated
    });
  } catch (error) {
    res.sendStatus(404).send("Not found");
  }
});

//delete EducationalOrganization using mongo(id  => EducationalOrganizationId)
//1
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const educationalOrganizationDeleted = await EducationalOrganization.findByIdAndRemove(
      id
    );
    if (!educationalOrganizationDeleted)
      return res
        .status(404)
        .send({ error: "EducationalOrganization does not exist" });
    res.json({
      msg: "EducationalOrganization was deleted successfully",
      data: educationalOrganizationDeleted
    });
  } catch (error) {
    res.status(404).send("educationalOrganization does not exist");
  }
});

//End of educationaOrganization CRUDS

//Course CRUDS


// get all Courses of One EducationalOrganizationId
//(id  => EducationalOrganizationId)
//1
router.get("/course/:id/", async (req, res) => {
  try {
    EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
      if (!err) {

        res.send(educationalOrganization.courses);

      } else {
        res.status(404).send("Not found");
      }
    });
  } catch (error) {
    res.status(404).send("Not found");
  }
}
);


//update create course using mongo (id  => EducationalOrganizationId)
//Create Course for educations_orgization
//1
router.post("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const isValidated = courseValidator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const educationalOrganization = await EducationalOrganization.findById(id);
    console.log(id)
    if (educationalOrganization._id !== undefined) {
      console.log(id)
      const course = await Courses.create(req.body);
      console.log(id)
      educationalOrganization.courses.push(course);
      educationalOrganization.save()
      res.send(course);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {

    res.sendStatus(404).send("Not found");
  }
});





//update course using mongo
//(id  => EducationalOrganizationId  ,course_id => courseId)
//1
router.put("/course/:id/:courseId", async (req, res) => {
  try {
    const isValidated = courseValidator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const educationalOrganization = await EducationalOrganization.findById(req.params.id);

    if (educationalOrganization !== undefined) {

      const course = educationalOrganization.courses.find(course => course._id == req.params.courseId);

      educationalOrganization.courses.remove(course);

      if (req.body.name != null) {
        course.name = req.body.name;

      }
      if (req.body.educatorName != null) {
        course.educatorName = req.body.educatorName;

      }
      if (req.body.description != null) {
        course.description = req.body.description;

      }
      if (req.body.places != null) {
        course.places = req.body.places;

      }
      if (req.body.availablePlaces != null) {
        course.availablePlaces = req.body.availablePlaces;

      }
      if (req.body.payment != null) {
        course.payment = req.body.payment;

      }
      if (req.body.courseDuration != null) {
        course.courseDuration = req.body.courseDuration;

      }
      if (req.body.startDate != null) {
        course.startDate = req.body.startDate;

      }
      if (req.body.endDate != null) {
        course.endDate = req.body.endDate;

      }
      if (req.body.categories != null) {
        course.categories = req.body.categories;

      }
      if (req.body.available != null) {
        course.available = req.body.available;

      }

      educationalOrganization.courses.push(course);


      const educationalOrganizationUpdated = await EducationalOrganization.findOneAndUpdate(
        { _id: req.params.id },
        educationalOrganization
      )

      res.send(educationalOrganizationUpdated);

    } else {
      res.send("Not Found");
    }
  } catch (error) {

    res.status(404).send("Not found");
  }
});

//(id  => EducationalOrganizationId  ,course_id => courseId)
//delete course using mongo
//1
router.delete("/course/:id/:courseId", async (req, res) => {
  try {

    const educationalOrganization = await EducationalOrganization.findById(req.params.id);
    if (educationalOrganization !== undefined) {
      const course = educationalOrganization.courses.find(course => course._id == req.params.courseId);
      educationalOrganization.courses.remove(course);
      educationalOrganization.save();
      res.send(educationalOrganization);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(404).send("Not found");
  }
});

//get course of specific educational organization
router.get("/course/:id/:courseId", (req, res) => {
  try {
    EducationalOrganization.findById(req.params.id, function async(err, educationalOrganization) {
      if (!err) {
        const course = educationalOrganization.courses.find(course => course._id == req.params.courseId);
        res.send(course);
      } else {
        res.status(404).send("Not found");
      }
    });
  }
  catch (error) {
    res.status(404).send("Not found");
  }
});
//End of Course CRUDS

// Master Class CRUD
// get one   Show_masterClasses of One EducationalOrganizationId
//(id  => EducationalOrganizationId ,masterClassId => masterClassID)
//1
router.get("/masterClass/:id/:masterClassId", async (req, res) => {
  try {
    EducationalOrganization.findById(req.params.id, function async(err, educationalOrganization) {
      if (!err) {
        const master = educationalOrganization.masterClass.find(master => master._id == req.params.masterClassId);
        res.send(master);
      } else {
        res.status(404).send("Not found");
      }
    });
  }
  catch (error) {
    res.status(404).send("Not found");
  }
});


//URL to create master classes   (id  => EducationalOrganizationId)
router.post("/masterClass/:id", async (req, res) => {//tmam
  const isValidated = masterClassValidator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const educationalOrganization = await EducationalOrganization.findById(req.params.id);
  // console.log("hello");

  if (educationalOrganization !== undefined) {
    const masterClass = await MasterClass.create(req.body);
    educationalOrganization.masterClass.push(masterClass);
    educationalOrganization.save();
    res.send(masterClass);
  } else {
    res.status(404).send("Not found");
  }
});

//(id  => EducationalOrganizationId)
router.get("/masterClass/:id/", async (req, res) => { //tmam
  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      res.send(educationalOrganization.masterClass);
    } else {
      res.status(404).send("Not found");
    }
  });
});

//(id  => EducationalOrganizationId  ,masterClassId => masterClassId)
router.put("/masterClass/:id/:masterClassId", async (req, res) => {/////baiza
  try {

    const isValidated = masterClassValidator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const educationalOrganization = await EducationalOrganization.findById(req.params.id);

    if (educationalOrganization !== undefined) {

      const master = educationalOrganization.masterClass.find(master => master._id == req.params.masterClassId);

      educationalOrganization.masterClass.remove(master);

      if (req.body.name !== undefined) {
        master.name = req.body.name;
      }
      if (req.body.places !== undefined) {
        master.places = req.body.places;
      }
      if (req.body.availablePlaces !== undefined) {
        master.availablePlaces = req.body.availablePlaces;
      }
      if (req.body.courses !== undefined) {
        master.courses = req.body.courses;
      }
      if (req.body.payment !== undefined) {
        master.payment = req.body.payment;
      }
      if (req.body.description !== undefined) {
        master.description = req.body.description;
      }

      if (req.body.courseDuration !== undefined) {
        master.courseDuration = req.body.courseDuration;
      }
      if (req.body.startDate !== undefined) {
        master.startDate = req.body.startDate;
      }
      if (req.body.endDate !== undefined) {
        master.endDate = req.body.endDate;
      }
      if (req.body.levelOfStudents !== undefined) {
        master.levelOfStudents = req.body.levelOfStudents;
      }
      if (req.body.effort !== undefined) {
        master.effort = req.body.effort;
      }
      if (req.body.available !== undefined) {
        master.available = req.body.available;
      }



      educationalOrganization.masterClass.push(master);


      const educationalOrganizationUpdated = await EducationalOrganization.findOneAndUpdate(
        { _id: req.params.id },
        educationalOrganization
      )

      res.send(educationalOrganizationUpdated);

    } else {
      res.send("Not Found");
    }
  } catch (error) {

    res.status(404).send("Not found");
  }
});


//(id  => EducationalOrganizationId  ,masterClassId => masterClassId)
router.delete("/masterClass/:id/:masterClassId", async (req, res) => {
  try {

    const educationalOrganization = await EducationalOrganization.findById(req.params.id);
    if (educationalOrganization !== undefined) {
      const master = educationalOrganization.masterClass.find(master => master._id == req.params.masterClassId);
      educationalOrganization.masterClass.remove(master);
      educationalOrganization.save();
      res.send(educationalOrganization);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(404).send("Not found");
  }
});

// End Master Class CRUD

//  Educator CRUD

//URL to add info about educators  (id  => educationalOrganizationId)
router.post("/educator/:id", async (req, res) => {//tmam
  const isValidated = educatorValidator.createValidation(req.body);
  if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

  const educationalOrganization = await EducationalOrganization.findById(req.params.id);
  // console.log("hello");

  if (educationalOrganization !== undefined) {
    const educator = await Educator.create(req.body);
    educationalOrganization.educators.push(educator);
    educationalOrganization.save();
    res.send(educator);
  } else {
    res.status(404).send("Not found");
  }
});

// get all educator of one EducationalOrganization  (id  => EducationalOrganizationId)
router.get("/educator/:id/", async (req, res) => {//tmam
  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      res.send(educationalOrganization.educators);
    } else {
      res.status(404).send("Not found");
    }
  });
});
// update   one educator of one EducationalOrganization  (id  => EducationalOrganizationId, educator_id=> EducatorID)
router.put("/educator/:id/:educatorId", async (req, res) => {//tmam
  try {

    const isValidated = educatorValidator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const educationalOrganization = await EducationalOrganization.findById(req.params.id);

    if (educationalOrganization !== undefined) {

      const educator = educationalOrganization.educators.find(educator => educator._id == req.params.educatorId);

      educationalOrganization.educators.remove(educator);

      if (req.body.name != null) {
        educator.name = req.body.name;

      }
      if (req.body.experienceLevel != null) {
        educator.experienceLevel = req.body.experienceLevel;

      }
      if (req.body.contact != null) {
        educator.contact = req.body.contact;

      }
      if (req.body.certifactes != null) {
        educator.certifactes = req.body.certifactes;

      }


      educationalOrganization.educators.push(educator);


      const educationalOrganizationUpdated = await EducationalOrganization.findOneAndUpdate(
        { _id: req.params.id },
        educationalOrganization
      )

      res.send(educationalOrganizationUpdated);

    } else {
      res.send("Not Found");
    }
  } catch (error) {

    res.status(404).send("Not found");
  }
});
// Delete one Educator of one educationaOrganization
//(id  => EducationalOrganizationId  ,educator_profile_id => educatorProfileId)
router.delete("/educator/:id/:educatorId", async (req, res) => {
  try {

    const educationalOrganization = await EducationalOrganization.findById(req.params.id);
    if (educationalOrganization !== undefined) {
      const educator = educationalOrganization.educators.find(educator => educator._id == req.params.educatorId);
      educationalOrganization.educators.remove(educator);
      educationalOrganization.save();
      res.send(educationalOrganization);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(404).send("Not found");
  }
});

router.get("/educator/:id/:educatorId", (req, res) => {
  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      const educator = educationalOrganization.educators.find(educator => educator._id == req.params.educatorId);
      res.send(educator);
    } else {
      res.status(404).send("Not found");
    }
  });
});

// End Educator CRUD



// Certificant CRUD

//URL to create certificates  (id  => EducationalOrganizationId)
router.post("/certificate/:id", async (req, res) => {
  const isValidated = certificateValidator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });


  const educationalOrganization = await EducationalOrganization.findById(req.params.id);
  if (educationalOrganization !== undefined) {
    const certificate = await Certificate.create(req.body);
    educationalOrganization.certificates.push(certificate);
    educationalOrganization.save();
    res.send(certificate);
  } else {
    res.status(404).send("Not found");
  }
});

//(id  => EducationalOrganizationId)
router.get("/certificate/:id/", async (req, res) => {
  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      if (educationalOrganization !== null) {
        res.send(educationalOrganization.certificates);
      } else {
        res.status(404).send("Not found");
      }
    } else {
      res.status(404).send("Not found");
    }
  });
});
//(id  => EducationalOrganizationId  ,training_program_id => trainingProgramId)
router.get("/certificate/:id/:certificateId", async (req, res) => {
  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      const certificate = educationalOrganization.certificates.find(certificate => certificate._id == req.params.certificateId);
      res.send(certificate);
    } else {
      res.status(404).send("Not found");
    }
  });
});
//(id  => EducationalOrganizationId  ,certificate_id => certificateId)
router.put("/certificate/:id/:certificateId", async (req, res) => {

  const isValidated = certificateValidator.updateValidation(req.body);

  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      //const certifacatee = co.certificates.find(m=>m._id==req.params.certificate_id);
      var certifacate1; ///here
      for (const certifacate of educationalOrganization.certificates) {
        if (certifacate !== null) {
          if (certifacate._id == req.params.certificateId) {
            certifacate1 = certifacate;
            //console.log(end)
          }
        }
      }


      if (certifacate1 !== undefined) {
        educationalOrganization.certificates.remove(certifacate1);

        if (req.body.name !== null) {
          certifacate1.name = req.body.name;
        }
        if (req.body.type !== null) {
          certifacate1.type = req.body.type;
        }
        if (req.body.accreditation !== null) {
          certifacate1.accreditation = req.body.accreditation;
        }


        educationalOrganization.certificates.push(certifacate1);
        educationalOrganization.save();

        res.send(certifacate1);
      } else {
        res.send("this  certificate is not Found");
      }
    } else {
      res.status(404).send("Not found");
    }
  });
});
//(id  => EducationalOrganizationId  ,certificate_id => certificateId)
router.delete("/certificate/:id/:certificateId", async (req, res) => {
  EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
    if (!err) {
      const certifacate = educationalOrganization.certificates.find(certifacate => certifacate._id == req.params.certificateId);
      res.send(certifacate);
      educationalOrganization.certificates.remove(certifacate);
      educationalOrganization.save();
    } else {
      res.status(404).send("Not found");
    }
  });
});
//End Certificant CRUD

// Training Program CRUD
//URL to add trainings programs  (id  => EducationalOrganizationId)
router.post("/trainingProgram/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const isValidated = trainingProgramValidator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const educationalOrganization = await EducationalOrganization.findById(id);
    if (educationalOrganization._id !== undefined) {
      const trainingProgram = await TrainingProgram.create(req.body);
      //course.save();
      educationalOrganization.trainingPrograms.push(trainingProgram);
      educationalOrganization.save();
      res.send(trainingProgram);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {

    res.status(404).send("Not found");
  }
});
//(id  => EducationalOrganizationId)
router.get("/trainingProgram/:id/", async (req, res) => {
  try {
    EducationalOrganization.findById(req.params.id, function (err, educationalOrganization) {
      if (!err) {

        res.send(educationalOrganization.trainingPrograms);

      } else {
        res.status(404).send("Not found");
      }
    });
  } catch (error) {
    res.status(404).send("Not found");
  }
});

//(id  => EducationalOrganizationId  ,training_program_id => trainingProgramId)
router.get("/trainingProgram/:id/:trainingProgramId", async (req, res) => {
  try {
    EducationalOrganization.findById(req.params.id, function async(err, educationalOrganization) {
      if (!err) {
        const trainingProgram = educationalOrganization.trainingPrograms.find(trainingProgram => trainingProgram._id == req.params.trainingProgramId);
        res.send(trainingProgram);
      } else {
        res.status(404).send("Not found");
      }
    });
  }
  catch (error) {
    res.status(404).send("Not found");
  }
}
);
//(id  => EducationalOrganizationId  ,programs_id => programsId)
router.put("/trainingProgram/:id/:traingProgramId", async (req, res) => {
  try {

    const isValidated = trainingProgramValidator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    const educationalOrganization = await EducationalOrganization.findById(req.params.id);

    if (educationalOrganization !== undefined) {
      const trainingProgram = educationalOrganization.trainingPrograms.find(trainingProgram => trainingProgram._id == req.params.traingProgramId);
      educationalOrganization.trainingPrograms.remove(trainingProgram);
      if (req.body.name != null) {
        trainingProgram.name = req.body.name;
      }
      if (req.body.trainerId != null) {
        trainingProgram.trainerId = req.body.trainerId;
      }
      if (req.body.trainerName != null) {
        trainingProgram.trainerName = req.body.trainerName;
      }
      if (req.body.description != null) {
        trainingProgram.description = req.body.description;
      }
      if (req.body.type != null) {
        trainingProgram.type = req.body.type;
      }
      if (req.body.duration != null) {
        trainingProgram.duration = req.body.duration;
      }
      if (req.body.applyDueDate != null) {
        trainingProgram.applyDueDate = req.body.applyDueDate;
      }
      if (req.body.startDate != null) {
        trainingProgram.startDate = req.body.startDate;
      }
      if (req.body.requiredSkills != null) {
        trainingProgram.requiredSkills = req.body.requiredSkills;
      }
      educationalOrganization.trainingPrograms.push(trainingProgram);
      educationalOrganization.save();
      res.send(trainingProgram);
    } else {
      res.send("training program is not found");
    }
  } catch (error) {

    res.status(404).send("Not found");
  }
});

//(id  => EducationalOrganizationId  ,training_program_id => trainingProgramId)
router.delete("/trainingProgram/:id/:trainingProgramId", async (req, res) => {
  try {

    const educationalOrganization = await EducationalOrganization.findById(req.params.id);
    if (educationalOrganization !== undefined) {
      const traingProgram = educationalOrganization.trainingPrograms
        .find(traingProgram => traingProgram._id == req.params.trainingProgramId);
      educationalOrganization.trainingPrograms.remove(traingProgram);
      educationalOrganization.save();
      res.send(traingProgram);
    } else {
      res.status(404).send("Not found");
    }
  } catch (error) {
    res.status(404).send("Not found");
  }
}
);

// End Training Program CRUD



//1
//accept member for course
//(id  => EducationalOrganizationId  ,course_id => courseId,memberId=>studentId)
router.put(
  "/:id/acceptMember/:courseId/:memberId",
  async (req, res) => {
    const educationalOrganization = await EducationalOrganization.findById(req.params.id);
    const course = educationalOrganization.courses.find(course => course._id == req.params.courseId);
    const courseModel = await Courses.findById(req.params.courseId);
    if (course !== undefined && courseModel !== null) {
      if (course.available === true) {
        const courses = educationalOrganization.courses;
        if (course.acceptedMembers == null) course.acceptedMembers = [];
        if (courseModel.acceptedMembers == null) courseModel.acceptedmembers = [];
        for (var i = 0; i < courses.length; i++) {
          if (courses[i]._id == req.params.courseId) courses.splice(i, 1);   
        }
        course.acceptedMembers.push(req.params.memberId);
        courseModel.acceptedMembers.push(req.params.memberId);
        courseModel.save();
        courses.push(course);
        //  console.log(masterClasses)
        educationalOrganization.save();
        const educationalOrganizationUpdated = await EducationalOrganization.findOneAndUpdate(
          { _id: req.params.id },
          { courses: courses }
        );

        res.send(educationalOrganizationUpdated.courses);
      } else {
        res.send("this Course is not available");
      }
    } else {
      res.send("There is no such Course Here");
    }
  }
);
//1
//accept member for master class
//(id  => EducationalOrganizationId  ,masterClassId => masterClassId,memberId=>studentId)
router.put("/:id/acceptMember/:masterClassId/:memberId", async (req, res) => {
  const educationaOrganization = await EducationalOrganization.findById(req.params.id);
  const masterClass = educationaOrganization.masterClass.find(
    masterClass => masterClass._id == req.params.masterClassId
  );
  const masterClassModel = await MasterClass.findById(
    req.params.masterClassId
  );
  if (masterClass !== undefined) {
    if (masterClass.available === true) {
      const masterClasses = educationaOrganization.masterClass;

      if (masterClass.studentsAssigened == null) masterClass.studentsAssigened = [];

      if (masterClassModel.studentsAssigened == null) masterClassModel.studentsAssigened = [];

      for (var i = 0; i < masterClasses.length; i++) {
        if (masterClasses[i]._id == req.params.masterClassId) {
          masterClasses.splice(i, 1);
        }
      }
      masterClass.studentsAssigened.push(req.params.memberId);
      masterClassModel.studentsAssigened.push(req.params.memberId);
      masterClassModel.save();
      masterClasses.push(masterClass);
      //  console.log(masterClasses)
      educationaOrganization.save();
      const educationalOrganizationUpdated = await EducationalOrganization.findOneAndUpdate(
        { _id: req.params.id },
        { masterClass: masterClasses }
      );
      res.send(educationalOrganizationUpdated.masterClass);
    } else {
      res.send("this Master Class is not available");
    }
  } else {
    res.send("There is no such Master Class Here");
  }
}
);

//End Badr

module.exports = router;
