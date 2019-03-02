//creation of educational organization
//create master class
//create courses
//create training programs
//create certificates
//add info about educators and trainers
const express = require('express');
const router = express.Router();
router.use(express.json());
const Joi = require('joi');


const room = require('../models/room'); 
const coworking_space = require('../models/coworking_space'); 


const coworking_spaces = require('../arrays/coworking_spaces'); 
const educational_organization = require('../models/educational_organization.js');
const master_class=require('../models/master_class.js');
const courses=require('../models/courses.js');
const training_programs=require('../models/training_programs.js');
const certificates=require('../models/certificates.js');
const educators=require('../models/educators.js');

const educational_organizations = require('../arrays/educational_organizations.js');


router.get("/",(req,res)=>{
    res.send("afssa");
});


//delete educational_organization,course,certificate,educator,master_class,training_programs (id  => educational_organizationId)
router.delete("/:id/delete_educational_organization",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    educational_organizations.splice(education);
   

    res.send({data:educational_organizations});
    
}); 

//reserve workshop for course  
router.put('/:id/accept_reservation/:room_id',(req,res)=>{
 
    const schema={
        reserved:Joi.boolean(),
        reserved_date:Joi.string(),
        end_of_reservation:Joi.string(),
        reserved_id: Joi.number().integer()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
   
    const co = coworking_spaces.find(m=>m.id===parseInt(req.params.id));
    const roooms = co.rooms;
    const room = roooms.find(m=>m.id===parseInt(req.params.room_id));
    if(room.reserved===false){
      room.reserved_id = req.body.reserved_id;
        room.reserved=req.body.reserved;
        room.reserved_date=req.body.reserved_date;
        room.end_of_reservation=req.body.end_of_reservation;
        res.send(room);
        return;
    };

    res.send("this room is not available");
});
//URl to create educational organization  (partner_id =>partnerId)
router.post("/create_educational_organization/:partner_id",(req,res)=>{
    const schema={
        name:Joi.string().required(),         
    };

    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const edu = new educational_organization(educational_organizations.length+1,parseInt(req.params.partner_id),
                                            req.body.name,null,null,null,null,null)
    educational_organizations.push(edu);
});

//URL to add courses (id  => educational_organizationId)
router.post("/:id/add_course",(req,res)=>{
    
    const schema={
               
        name:Joi.string().required(),
        educator_id:Joi.string().required(),
        educator_name:Joi.string().required(),
        description:Joi.string().required(),
        students_assigened:Joi.array(),
        places:Joi.number().integer().required(),
        
        payment:Joi.string().required(),
        course_duration:Joi.string().required(),
        start_date:Joi.string().required(),
        end_date:Joi.string().required(),
        level_of_students:Joi.string().required(),
        effort:Joi.string().required(),
        available:Joi.boolean().required()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const educ =educational_organizations.find(m=>m.id===parseInt(req.params.id));    

    const course = new courses(educ.courses.length+1,req.body.name,req.body.educator_id,req.body.educator_name,
                                 req.body.description,req.body.students_assigened,req.body.places,req.body.payment,
                                 null,req.body.course_duration,req.body.start_date,req.body.end_date,
                                 req.body.level_of_students,req.body.effort,req.body.available);
    educ.courses.push(course);
    res.send({data:educational_organizations});
});

//URL to create master classes   (id  => educational_organizationId)
router.post("/:id/add_master_classes",(req,res)=>{
const schema ={
        name:Joi.string().required(),
        description:Joi.string().required(),
        payment:Joi.string().required(),
        places:Joi.number().integer().required(),
        available_places:Joi.number().integer().required(),
        
        course_duration:Joi.string().required(),
        start_date:Joi.string().required(),
        end_date:Joi.string().required(),
        level_of_students:Joi.string().required(),
        effort:Joi.string().required(),
        available:Joi.boolean().required()
}

const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
const master_classes = new master_class(education.master_class.length+1,req.body.name,req.body.description,
                                        req.body.payment,req.body.places,req.body.available_places,[],
                                        req.body.course_duration,req.body.start_date,req.body.end_date,
                                        req.body.level_of_students,req.body.effort,req.body.available)
education.master_class.push(master_classes);
res.send({data:educational_organizations});
});


//accept member for course
//(id  => educational_organizationId  ,course_id => courseId,student_id=>studentId)
router.post("/:id/accept_member_course/:course_id/:student_id",(req,res)=>{
   const education = educational_organizations.find(m=>m.id===parseInt(req.params.id));
   const course =education.courses.find(m=>m.id===parseInt(req.params.course_id));
   if(course.available===true){
       course.students_assigened.push(parseInt(req.params.student_id))
   }

});
//accept member for master class 
//(id  => educational_organizationId  ,master_class_id => masterClassId,student_id=>studentId)
router.post("/:id/accept_member_master/:master_class_id/:student_id",(req,res)=>{
    const education = educational_organizations.find(m=>m.id===parseInt(req.params.id));
    const master_class =education.master_class.find(m=>m.id===parseInt(req.params.master_class_id));
    if(master_class.available===true){
        master_class.students_assigened.push(parseInt(req.params.student_id))
    }
 
 });

//URL to add info about educators  (id  => educational_organizationId)
router.post("/:id/add_educators_info",(req,res)=>{
const schema={
    name:Joi.string().required(),
    experience_level:Joi.number().integer().min(1).max(5).required(),
    certificates:Joi.string().required(),
    contact:Joi.string().required()
}
const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));

const educator=new educators(
    education.educators.length+1,
    req.body.name,
    req.body.experience_level,
    req.body.certificates,
    req.body.contact
)
education.educators.push(educator);
res.send({data:educational_organizations});

});

//(id  => educational_organizationId  ,educator_profile_id => educatorProfileId)
router.delete("/:id/delete_educator_profile/:educator_profile_id",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    const educator =education.educators.find(c=>c.id===parseInt(req.educator_profile_id));
    education.educators.splice(educator);

    res.send({data:educational_organizations});
    
});

//(id  => educational_organizationId)
router.get("/:id/show_educator_profile",(req,res) =>{
    
    res.send(educational_organizations.find(m=>m.id===parseInt(req.params.id)).educators);
    
});
router.put("/update_educator/:id/:educator_id",(req,res)=>{
    const schema={
        name:Joi.string(),
        expereince_level:Joi.string(),
        certifactes:Joi.string(),
        contact:Joi.string()
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };

    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    const educatorr=education.educators.find(m=>m.id===parseInt(req.params.educator_id));
    if(req.body.name!=null){
        educatorr.name=req.body.name;
    }
    if(req.body.expereince_level!=null){
        educatorr.expereince_level=req.body.expereince_level;
    }
    if(req.body.certifactes!=null){
        educatorr.certifactes=req.body.certifactes;
    }
    if(req.body.contact!=null){
        educatorr.contact=req.body.contact;
    }
   
    res.send(educational_organizations);
});



//URL to create certificates  (id  => educational_organizationId)
router.post("/:id/create_certificates",(req,res)=>{
    const schema={
               
        name:Joi.string().required(),
        type:Joi.string().required(),
        accreditation:Joi.string().required()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const educ =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    
    const certificate =new certificates(educ.certificates.length+1, req.body.name,req.body.type,
        req.body.accreditation)
    educ.certificates.push(certificate);
    res.send({data:educational_organizations});
});


//URL to add trainings programs  (id  => educational_organizationId)
router.post("/:id/add_programs",(req,res)=>{

    const schema={
       name:Joi.string().required(),
       educator_id:Joi.string().required(),
       educator_name:Joi.string().required(),
       description:Joi.string().required(),
       type:Joi.string().required(),
       duration:Joi.string().required(),
       apply_due_date:Joi.string().required(),
       start_date:Joi.string().required(),
       required_skills:Joi.string().required()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));

    const training = new training_programs (
        education.training_programs.length+1,
        req.body.name,
        req.body.educator_id,
        req.body.educator_name,
        req.body.description,
        req.body.type,
        req.body.duration,
        req.body.apply_due_date,
        req.body.start_date,
        req.body.required_skills
    )

education.certificates.push(training);




res.send({data:educational_organizations});
});

//(id  => educational_organizationId  ,certificate_id => certificateId)
router.delete("/:id/delete_certificate/:certificate_id",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    const certifacate =education.certificates.find(c=>c.id===parseInt(req.params.certificate_id));
    education.certificates.splice(certifacate);

    res.send({data:educational_organizations});
    
});

//(id  => educational_organizationId  ,training_program_id => trainingProgramId)
router.delete("/:id/delete_training_programs/:training_program_id",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    const training_program =education.training_programs.find(c=>c.id===parseInt(req.params.certificate_id));
    education.training_programs.splice(training_program);

    res.send({data:educational_organizations});
    
});
//(id  => educational_organizationId  ,course_id => courseId)
router.delete("/:id/delete_courses/:course_id",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    const course =education.courses.find(c=>c.id===parseInt(req.params.course_id));
    education.courses.splice(course);

    res.send({data:educational_organizations});
    
});
//(id  => educational_organizationId  ,master_class_id => masterClassId)
router.delete("/:id/delete_master_class/:master_class_id",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    const master_class =education.master_class.find(c=>c.id===parseInt(req.params.master_class_id));
    education.master_class.splice(master_class);

    res.send({data:educational_organizations});
    
});
//show info about educators,courses,master_chasses,training-programs,certificates
//(id  => educational_organizationId)
router.get("/:id/show_educational_organization",(req,res) =>{
    res.send(educational_organizations.find(m=>m.id===parseInt(req.params.id)));
});

//(id  => educational_organizationId)
router.get("/:id/show_courses",(req,res) =>{
    
    res.send(educational_organizations.find(m=>m.id===parseInt(req.params.id)).courses);
    
});
//(id  => educational_organizationId)
router.get("/:id/show_master_classes",(req,res) =>{
    
    res.send(educational_organizations.find(m=>m.id===parseInt(req.params.id)).master_class);
    
});
//(id  => educational_organizationId)
router.get("/:id/show_training_programs",(req,res) =>{
    
    res.send(educational_organizations.find(m=>m.id===parseInt(req.params.id)).training_programs);
    
});

//(id  => educational_organizationId)
router.get("/:id/show_certificates",(req,res) =>{
    
    res.send(educational_organizations.find(m=>m.id===parseInt(req.params.id)).certificates);
    
});

//update educational organization ,master_class,training_program,course,certificate,educator
//(id  => educational_organizationId)
router.put("/:id/update_educational",(req,res)=>{
    const schema={
        name:Joi.string()
      
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    if(req.body.name!=null){
        education.name=req.body.name;
    }
    res.send(educational_organizations);
});
//(id  => educational_organizationId  ,course_id => courseId)
router.put("/:id/update_course/:course_id",(req,res)=>{
    const schema={
        name:Joi.string(),
        
        educator_id:Joi.number().integer(),
        educator_name:Joi.string(),
        places:Joi.number().integer(),
        available_places:Joi.number().integer(),
        payment:Joi.string(),
        description:Joi.string(),
        students_assigened:Joi.array(),
        course_duration:Joi.string(),
        start_date:Joi.string(),
        end_date:Joi.string(),
        level_of_students:Joi.string(),
        effort:Joi.string(),
        available:Joi.boolean()
      
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    const course= education.courses.find(m=>m.id===parseInt(req.params.course_id));
    if(req.body.name!=null){
        course.name=req.body.name;
    }
    if(req.body.educator_id!=null){
        course.educator_id=req.body.educator_id;
    }
    if(req.body.educator_name!=null){
        course.educator_name=req.educator_name;
    }
    if(req.body.places!=null){
        course.places=req.body.places;
    }
    if(req.body.available_places!=null){
        course.available_places=req.body.available_places;
    }
    if(req.body.payment!=null){
        course.payment=req.body.payment;
    }
    if(req.body.description!=null){
        course.description=req.body.description;
    }
    if(req.body.students_assigened!=null){
        course.students_assigened=req.body.students_assigened;
    }
    if(req.body.course_duration!=null){
        course.course_duration=req.body.course_duration;
    }
    if(req.body.start_date!=null){
        course.start_date=req.body.start_date;
    }
    if(req.body.end_date!=null){
        course.end_date=req.body.end_date;
    }
    if(req.body.level_of_students!=null){
        course.level_of_students=req.body.level_of_students;
    }
    if(req.body.effort!=null){
        course.effort=req.body.effort;
    }
    if(req.body.available!=null){
        course.available=req.body.available;
    }

    res.send(educational_organizations);
});
//(id  => educational_organizationId  ,master_class_id => masterClassId)
router.put("/:id/update_master/:master_class_id",(req,res)=>{
    const schema={
        name:Joi.string(),
        
       
        places:Joi.number().integer(),
        available_places:Joi.number().integer(),
        payment:Joi.string(),
        description:Joi.string(),
        courses:Joi.array(),
        course_duration:Joi.string(),
        start_date:Joi.string(),
        end_date:Joi.string(),
        level_of_students:Joi.string(),
        effort:Joi.string(),
        available:Joi.boolean()
      
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    const master= education.master_class.find(m=>m.id===parseInt(req.params.master_class_id));
    if(req.body.name!=null){
        master.name=req.body.name;
    }
  
    if(req.body.places!=null){
        master.places=req.body.places;
    }
    if(req.body.available_places!=null){
        master.available_places=req.body.available_places;
    }
    if(req.body.courses!=null){
        master.courses=req.body.courses;
    }
    if(req.body.payment!=null){
        master.payment=req.body.payment;
    }
    if(req.body.description!=null){
        master.description=req.body.description;
    }
   
    if(req.body.course_duration!=null){
        master.course_duration=req.body.course_duration;
    }
    if(req.body.start_date!=null){
        master.start_date=req.body.start_date;
    }
    if(req.body.end_date!=null){
        master.end_date=req.body.end_date;
    }
    if(req.body.level_of_students!=null){
        master.level_of_students=req.body.level_of_students;
    }
    if(req.body.effort!=null){
        master.effort=req.body.effort;
    }
    if(req.body.available!=null){
        master.available=req.body.available;
    }

    res.send(educational_organizations);
    
});
//(id  => educational_organizationId  ,certificate_id => certificateId)
router.put("/:id/update_certificate/:certificate_id",(req,res)=>{
    const schema={
        name:Joi.string(),
        type:Joi.string(),
        accreditation:Joi.string()
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    const certifacatee=education.certificates.find(m=>m.id===parseInt(req.params.certificate_id));
    if(req.body.name!=null){
        certifacatee.name=req.body.name;
    }
    if(req.body.type!=null){
        certifacatee.type=req.body.type;
    }
    if(req.body.available!=null){
        certifacatee.accreditation=req.body.accreditation;
    }
    res.send(educational_organizations);
});

//(id  => educational_organizationId  ,programs_id => programsId)
router.put("/:id/update_programs/:programs_id",(req,res)=>{
    const schema={
        name:Joi.string(),
        trainer_id:Joi.string(),
        trainer_name:Joi.string(),
        description:Joi.string(),
        type:Joi.string(),
        duration:Joi.string(),
        apply_due_date:Joi.string(),
        start_date:Joi.string(),
        required_skills:Joi.string(),
     };
     const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    };

    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));
    const program=education.training_programs.find(m=>m.id===parseInt(req.params.programs_id));
    if(req.body.name!=null){
        program.name=req.body.name;
    }
    if(req.body.trainer_id!=null){
        program.trainer_id=req.body.trainer_id;
    }
    if(req.body.trainer_name!=null){
        program.trainer_name=req.body.trainer_name;
    }
    if(req.body.description!=null){
        program.description=req.body.description;
    }
    if(req.body.type!=null){
        program.type=req.body.type;
    }
    if(req.body.duration!=null){
        program.duration=req.body.duration;
    }
    if(req.body.apply_due_date!=null){
        program.apply_due_date=req.body.apply_due_date;
    }
    if(req.body.start_date!=null){
        program.start_date=req.body.start_date;
    }
    if(req.body.required_skills!=null){
        program.required_skills=req.body.required_skills;
    }
   
   
    
    res.send(educational_organizations);
});

module.exports = router



