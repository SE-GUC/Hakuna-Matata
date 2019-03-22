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

 // EOrg CRUDS
//create educational organization using mongo
//URl to create educational organization  (partner_id =>partnerId)
//(Updated)
//1
router.post("/create_educational_organization/:partner_id",async(req,res)=>{
    try{
        req.body.partner_id=parseInt(req.params.partner_id)
        const isValidated = ovalidator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });

        const organization = await educational_organization.create(req.body) 

        res.json({msg:'EducationalOrganization was created successfully', data: organization})
    }
    catch(error){
        console.log(error)
    }
});
//this is get all so " you put / only withou getall"
//(Updated)
//1
router.get("/",async(req,res)=>{
    try{
        const educationalor=await educational_organization.find();
        if(!educationalor) return res.status(404).send({error: 'organization does not exist'})
        res.json({msg:'You update educational_organization', data : educationalor})
    }
    catch(error){
        console.log(error)
    }
    
});
//get one  educational organization using mongo
//(id  => educational_organizationId)
//1
router.get("/:id/show_educational_organization",async(req,res) =>{
    try{
        const id =req.params.id
        const organizationfind=await educational_organization.findById(id);
        if(!organizationfind) return res.status(404).send({error: 'educational_organization does not exist'})
        res.json({msg:'You get the organization',data :organizationfind})
        }
        catch(error){
            console.log(error)
        }
       
        
    });
// get all Courses of One educational_organizationId
//(id  => educational_organizationId)
//1
router.get("/:id/show_educational_organization/Show_cousrses",async(req,res) =>{
    try{
        const id =req.params.id
        const organizationfind=await educational_organization.findById(id);
        if(!organizationfind) return res.status(404).send({error: 'educational_organization does not exist'})
        res.json({msg:'You get the organization',data :organizationfind.courses})
        }
        catch(error){
            console.log(error)
        }
       
        
    });
// get all Show_MasterClasses of One educational_organizationId
//(id  => educational_organizationId)
//1
router.get("/:id/show_educational_organization/Show_MasterClasses",async(req,res) =>{
    try{
        const id =req.params.id
        const organizationfind=await educational_organization.findById(id);
        if(!organizationfind) return res.status(404).send({error: 'educational_organization does not exist'})
        res.json({msg:'You get the organization',data :organizationfind.master_class})
        }
        catch(error){
            console.log(error)
        }
       
        
    });
    //(id  => educational_organizationId)
    //1
router.put("/:id/update_educational",async(req,res)=>{
    try{
        const id =req.params.id
        const organizationupdate=await educational_organization.findById(id);
        if(!organizationupdate) return res.status(404).send({error: 'organization does not exist'})
        const isValidated = ovalidator.updateValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const updatedorganization = await educational_organization.findOneAndUpdate({"_id":id},req.body)
        res.json({msg:'You update educational_organization',data : updatedorganization})
        }
        catch(error){
            console.log(error)
        }
});

//delete educational_organization using mongo(id  => educational_organizationId)
//1
router.delete("/:id/delete_educational_organization",async(req,res) =>{
    try{
        const id=req.params.id;
        const deletedorganization=await educational_organization.findByIdAndRemove(id);
        if(!deletedorganization) return res.status(404).send({error: 'educationalorganization does not exist'})
        res.json({msg:'organization was deleted successfully', data: deletedorganization})
    }
    catch(error)
      {
          console.log(error)
      }
        
    });  



    //End of EOrg CRUDS




    // get one   Show_MasterClasses of One educational_organizationId
//(id  => educational_organizationId ,masterClass_id => MasterClassID)
//1
router.get("/:id/show_educational_organization/:masterClass_id/Show_MasterClasses",async(req,res) =>{
    try{
        const id =req.params.id
        const masterClassId=req.params.masterClass_id
        const organizationfind=await educational_organization.findById(id);
        if(!organizationfind) return res.status(404).send({error: 'educational_organization does not exist'})
        const masterClass=organizationfind.master_class.find(returnedMC=>returnedMC._id ==masterClassId)
        if(masterClass!==undefined)
        res.json({msg:'You get the master Class', masterClass})
        else
        res.json({msg:'this master Class not Found'})


    }
        catch(error){
            console.log(error)
        }
       
        
    });






















////////////////////////////////
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

//(id  => educational_organizationId  ,master_class_id => masterClassId)
router.delete("/:id/delete_master_class/:master_class_id",(req,res) =>{
    const education =educational_organizations.find(m=>m.id===parseInt(req.params.id));    
    const master_class =education.master_class.find(c=>c.id===parseInt(req.params.master_class_id));
    education.master_class.splice(master_class);

    res.send({data:educational_organizations});
    
});
//show info about educators,courses,master_chasses,training-programs,certificates

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

//update  ,master_class,training_program,course,certificate,educator


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



