//creation of educational organization
//create master class
//create courses
//create training programs
//create certificates
//add info about educators and trainers


//3wo
const express = require('express');
const router = express.Router();
router.use(express.json());
const Joi = require('joi');


const room = require('../models/room'); 
const coworking_space = require('../models/coworking_space'); 


const educational_organization = require('../models/educational_organization.js');
const master_class=require('../models/master_class.js');
const courses=require('../models/courses.js');
const training_programs=require('../models/training_programs.js');
const certificates=require('../models/certificates.js');
const educators=require('../models/educators.js');

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

//Course CRUDS

//creat course 
//
router.post("/add_course",async(req,res)=>{
    try {
     const isValidated = validator.createValidation(req.body);
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
    const course = await courses.create(req.body) 
     res.send({msg: "Course is created ",data: course});  
    }   catch(error) {
        // We will be handling the error later
        console.log(error)
    }    

});

//update create course using mongo (id  => educational_organizationId)
//Create Course for educations_orgization
//1
router.post("/:id/add_course",async(req,res)=>{
    try{
       const id =req.params.id
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const add_eduOrg= await educational_organization.findById(id);
        if(add_eduOrg._id!==undefined){
            const course = await courses.create(req.body) 
       //course.save();
            add_eduOrg.courses.push(course);
            const temp= await add_eduOrg.save();
            res.send(add_eduOrg);    
         }
        else {
            res.status(404).send("Not found")
        }
    }
        catch(error) {
            // We will be handling the error later
            console.log(error)
        }  
});


//get Show all Cousres
//1
router.get("/show_courses",async(req,res) =>{
    try{
    const allCourses=await courses.find();
    if(!allCourses) return res.status(404).send({error: 'courses do not exist'})
    res.json({msg:'You get the course',data :allCourses})
    }
    catch(error){
        console.log(error)
    }
});

//(id  => CourseId)
//get course by id using mongo
//1
router.get("/:id/show_courses",async(req,res) =>{
    try{
    const id =req.params.id
    const coursefind=await courses.findById(id);
    if(!coursefind) return res.status(404).send({error: 'course does not exist'})
    res.json({msg:'You get the course',data :coursefind})
    }
    catch(error){
        console.log(error)
    }
});

//update course using mongo
//(course_id => courseId)
//1
router.put("/update_course/:course_id",async (req,res)=>{
  try{
    const course_id=req.params.course_id
    const isValidated = validator.updateValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const up_course=await courses.findOneAndUpdate({"_id":course_id},req.body)
        const cousreAfterUpdate=await courses.findOne({"_id":course_id})
        const EOrgs=await educational_organization.find()
        for(const EOrg of EOrgs){
            const updatedCourse = EOrg.courses.find(updatedCourse => updatedCourse._id ==course_id)
            if(updatedCourse!==undefined){
                EOrg.courses.remove(updatedCourse)
                EOrg.courses.push(cousreAfterUpdate)
                console.log(EOrg.courses)
                EOrg.save()
            }
        }
    res.send({data: cousreAfterUpdate,msg: "Before",data:up_course });
    }catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
});

//update course using mongo
//(id  => educational_organizationId  ,course_id => courseId)
//1
router.put("/:id/update_course/:course_id",async (req,res)=>{
 try{
    const id =req.params.id
    const course_id=req.params.course_id
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
     const edu = await educational_organization.findById(id)
        if(edu !==undefined){
            const up_course=edu.courses.find(co => co._id ==course_id)
            edu.courses.remove(up_course)
                if(req.body.name!=null){
                    up_course.name=req.body.name;
                }
                if(req.body.educator_name!=null){
                    up_course.educator_name=req.body.educator_name;
                }               
                if(req.body.description!=null){
                    up_course.description=req.body.description;
                }
                if(req.body.places!=null){
                    up_course.places=req.body.places;
                }
                if(req.body.available_places!=null){
                    up_course.available_places=req.body.available_places;
                }
                if(req.body.payment!=null){
                    up_course.payment=req.body.payment;
                }
                if(req.body.course_duration!=null){
                    up_course.course_duration=req.body.course_duration;
                }
               if(req.body.start_date!=null){
                    up_course.start_date=req.body.start_date;
                }
                if(req.body.end_date!=null){
                    up_course.end_date=req.body.end_date;
                }                
                if(req.body.categories!=null){
                    up_course.categories=req.body.categories;
                }        
                edu.courses.push(up_course)
      //          const Updatedcourse = await courses.findOneAndUpdate({"_id":course_id},up_course) 
                const x=  await educational_organization.findOneAndUpdate({"_id":id},{"courses":edu.courses});
        //      const checkifUp = await courses.findOne({"_id":course_id}) 
//                Updatedcourse.save()
                //edu.save();
                res.send({data: edu});
            }
            else {
                res.send("Not Found");

            }
        }   catch(error) {
            // We will be handling the error later
            console.log(error)
        }     
});

//(id  => educational_organizationId  ,course_id => courseId)
//delete course using mongo
//1
router.delete("/delete_courses/:course_id",async(req,res) =>{
    try{
    const id=req.params.course_id;
    

    //console.log({data :allCourses})

    const deletedformCourses= await courses.findOneAndRemove({"_id": id})
    var allCourses=await courses.find()
        //deletedformCourses.save()
    res.send({data :allCourses})
}
catch(error)
  {
      console.log(error)
  }
    
});
//(id  => educational_organizationId  ,course_id => courseId)
//delete course using mongo
//1
router.delete("/:id/delete_courses/:course_id",async(req,res) =>{
    try{
    const course_id=req.params.course_id;
    const id=req.params.id;
   
    const edu=await educational_organization.findById(id)
    if(edu !==undefined){
        const course = edu.courses.find(co => co._id ==course_id)
        edu.courses.remove(course)
        edu.save()
        // const deletedformCourses= await courses.findOneAndRemove({"_id":course_id})
        // deletedformCourses.save()
        res.send(edu)
    }else{   
        res.status(404).send("Not found")
    }
}
catch(error)
  {
      console.log(error)
  }
    
});/*
router.get("/:id/show_educational_organization/:course_id/Show_Course",async(req,res) =>{
    try{
        const id =req.params.id
        const CourseId=req.params.course_id
        const organizationfind=await educational_organization.findById(id);
        if(!organizationfind) return res.status(404).send({error: 'educational_organization does not exist'})
        const coursee=organizationfind.courses.find(returnedMC=>returnedMC._id ==CourseId)
        if(coursee!==undefined)
        res.json({msg:'You get the Course', Course})
        else
        res.json({msg:'this Course not Found'})


    }
        catch(error){
            console.log(error)
        }
       
        
    });*/
    router.get('/:id/sho/:course_id',(req,res)=>{
    
        educational_organization.findById  (req.params.id, function async (err, edu) {
                  
            if(!err){
                
               
                const co = edu.courses.find(m=>m._id==req.params.course_id);
                res.send(co);
               
            }
            
         
              else{
                res.status(404).send('Not found');
        
              }
          });
        
        });
    // End of Course CRUDS





















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







// Master Class CRUD

//URL to create master classes   (id  => educational_organizationId)
router.post("/:id/add_master_classes",async (req, res) => {
    const schema = {
        name: Joi.string().min(3).max(500).required(),
        description: Joi.string().min(3).max(500).required(),
        payment: Joi.string().min(3).max(500).required(),
        places: Joi.number().integer().min(3).max(500).required(),
        available_places: Joi.number().integer().min(3).max(500).required(),
        course_duration: Joi.string().min(3).max(500).required(),
        start_date: Joi.string().min(3).max(500).required(),
        end_date: Joi.string().min(3).max(500).required(),
        level_of_students: Joi.string().min(3).max(500).required(),
        effort: Joi.string().min(3).max(500).required(),
        available: Joi.boolean().required()
    }


    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const temp_EOrg= await educational_organization.findById(req.params.id)
    if(temp_EOrg!==undefined){
        const mclass=     await   master_class.create(req.body);
        temp_EOrg.master_class.push(mclass);
        temp_EOrg.save();
        res.send(mclass);

    }
    else
    {
        res.status(404).send('Not found');
    }

});


//(id  => educational_organizationId)
router.get("/:id/show_master_classes",async (req, res) => {



    educational_organization.findById(req.params.id, function(err, co) {
          
        if(!err){
            
           
            res.send(co.master_class);
        
        }
        
     
          else{
            res.status(404).send('Not found');
    
          }
      });
    
});

//(id  => educational_organizationId  ,master_class_id => masterClassId)
router.put("/:id/update_master/:master_class_id", async (req, res) => {
    const schema = {
        name: Joi.string(),
        places: Joi.number().integer(),
        available_places: Joi.number().integer(),
        payment: Joi.string(),
        description: Joi.string(),
        courses: Joi.array(),
        course_duration: Joi.string(),
        start_date: Joi.string(),
        end_date: Joi.string(),
        level_of_students: Joi.string(),
        effort: Joi.string(),
        available: Joi.boolean()

    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };
   // const education = await educational_organizations.({id})



   educational_organization.findById(req.params.id, function(err, co) {
                  
    if(!err){
        
       
        const master = co.master_class.find(m=>m._id==req.params.master_class_id);
        if(master!==undefined){
        co.master_class.remove(master)
        if (req.body.name != null) {
            master.name = req.body.name;
        }
        if (req.body.places != null) {
            master.places = req.body.places;
        }
        if (req.body.available_places != null) {
            master.available_places = req.body.available_places;
        }
        if (req.body.courses != null) {
            master.courses = req.body.courses;
        }
        if (req.body.payment != null) {
            master.payment = req.body.payment;
        }
        if (req.body.description != null) {
            master.description = req.body.description;
        }
        
        if (req.body.course_duration != null) {
            master.course_duration = req.body.course_duration;
        }
        if (req.body.start_date != null) {
            master.start_date = req.body.start_date;
        }
        if (req.body.end_date != null) {
            master.end_date = req.body.end_date;
        }
        if (req.body.level_of_students != null) {
            master.level_of_students = req.body.level_of_students;
        }
        if (req.body.effort != null) {
            master.effort = req.body.effort;
        }
        if (req.body.available != null) {
            master.available = req.body.available;
        }


        


        co.master_class.push(master)
                //educatorr.save();

                
          const x = educational_organization.findOneAndUpdate({"_id":req.params.id},co)
          //co.save();
        
       res.send({data:co});

    }else{
        res.send("there no such master class to update ")
    }
 
    }
    
      else{
        res.status(404).send('Not found');

      }
    });
});

//(id  => educational_organizationId  ,master_class_id => masterClassId)
router.delete("/:id/delete_master_class/:master_class_id", async(req, res) => {
    educational_organization.findById(req.params.id, function(err, co) {
                  
        if(!err){
            
           
            const mclas = co.master_class.find(m=>m._id==req.params.master_class_id);
            //res.send(ro);
           co.master_class.remove(mclas);
            
            co.save();
     
        }
        
          else{
            res.status(404).send('Not found');
    
          }
      
    
    });

    res.send({ data: educational_organizations });

});

// End Master Class CRUD

//  Educator CRUD

//URL to add info about educators  (id  => educational_organizationId)
router.post("/:id/add_educators_info", async (req, res) => {
    const schema = {
        name: Joi.string().min(3).max(500),
        experience_level: Joi.number().integer(),
        contact: Joi.string().min(3).max(500)
    }
    const result = Joi.validate(req.body, schema);
    //console.log(result)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }   
    const temp_EOrg= await educational_organization.findById(req.params.id)
    console.log( "hello")

    if(temp_EOrg!==undefined){
         const mclass=await educators.create(req.body);
         temp_EOrg.educators.push(mclass);
         temp_EOrg.save();
         res.send(temp_EOrg);
    }
    else{
        res.status(404).send('Not found');
    }


});

// get all educator of one educational_organization  (id  => educational_organizationId)
router.get("/:id/show_educator_profile",async (req, res) => {

    educational_organization.findById(req.params.id, function(err, co) {
            
      if(!err){
          
         
          res.send(co.educators);
      
      }
      
   
        else{
          res.status(404).send('Not found');
  
        }
    });
  
  
    
  });
// update   one educator of one educational_organization  (id  => educational_organizationId, educator_id=> EducatorID)
router.put("/update_educator/:id/:educator_id", async(req, res) => {
    const schema = {
        name: Joi.string().min(3).max(500),
        experience_level: Joi.number().integer().min(1).max(500),
       // certifactes: Joi.string().min(3).max(500),
        contact: Joi.string().min(3).max(500)
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };
        educational_organization.findById(req.params.id, function(err, co) {
                  
            if(!err){
                
               const id = req.params.id
               console.log( co.educators)
               var educatorr 
               for( const end of co.educators){
               if(end !==null){
                console.log(end._id)
                console.log(req.params.educator_id)
                if(end._id==req.params.educator_id){
                    educatorr=end
                    //console.log(end)
                }
               }
            }
             //   = co.educators.find(m=>m._id==req.params.educator_id);
                //res.send(ro);
               console.log(educatorr)
                if(educatorr!==undefined){
                    co.educators.remove(educatorr)
                if (req.body.name != null) {
                    educatorr.name = req.body.name;
                }
                if (req.body.experience_level != null) {
                    educatorr.experience_level = req.body.experience_level;
                }
                if (req.body.certifactes != null) {
                    educatorr.certifactes = req.body.certifactes;
                }
                if (req.body.contact != null) {
                    educatorr.contact = req.body.contact;
                }
            }
          co.educators.push(educatorr)
          const x = educational_organization.findOneAndUpdate({"_id":id},co)


          
          co.save();
          res.send(co);
            }
            
              else{
                res.status(404).send('Not found');
        
              }
          
        
        });
    });
// Delete one Educator of one EOrg
//(id  => educational_organizationId  ,educator_profile_id => educatorProfileId)
router.delete("/:id/delete_educator_profile/:educator_profile_id", async(req, res) => {

    educational_organization.findById(req.params.id, function(err, co) {
                  
        if(!err){
            
           
            const educatorr = co.educators.find(m=>m._id==req.params.educator_profile_id);
            //res.send(ro);
           co.educaroes.splice(educatorr);
            
            co.save();
     
        }
        
          else{
            res.status(404).send('Not found');
    
          }
      
    
    });


   // const education = educational_organizations.find(m => m.id === parseInt(req.params.id));
   // const educator = education.educators.find(c => c.id === parseInt(req.educator_profile_id));
  //  education.educators.splice(educator);

    res.send({ data: educational_organizations });

});
router.get('/:id/show_educc/:edu_id', (req,res)=>{
    
    educational_organization.findById (req.params.id,  function  (err, edu) {
              
        if(!err){
            
           
                const educ = edu.educators.find(m=>m._id==req.params.edu_id);
            res.send(educ);
           
        }
        
     
          else{
            res.status(404).send('Not found');
    
          }
      });
    
    });

// End Educator CRUD

// Certificant CRUD

//URL to create certificates  (id  => educational_organizationId)
router.post("/:id/create_certificates",async(req,res)=>{
    const schema={
               
        name:Joi.string().min(3).max(500).required(),
        type:Joi.string().min(3).max(500).required(),
        accreditation:Joi.string().min(3).max(500).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }


    const temp_EOrg= await educational_organization.findById(req.params.id)
    if(temp_EOrg!==undefined){
        const cer= await  certificates.create(req.body);
        temp_EOrg.certificates.push(cer);
        temp_EOrg.save();
        res.send(cer);
        
    }else{
        res.status(404).send('Not found');
    }


});

router.get("/:id/getcertificate",async (request,response)=>{
    await  certificates.findById(request.params.id, function(err, cer) {
               
             if(!err){       
              response.send(cer);      
             }    
               else{
                  response.status(404).send('Not found');    
               }
           });
     })

//(id  => educational_organizationId)
router.get("/:id/show_certificates",async(req,res) =>{
    console.log("rgg")
    educational_organization.findById(req.params.id, function(err, co) {
          
        if(!err){       
            res.send(co.certificates);      
        }    
          else{
            res.status(404).send('Not found');    
          }
      });    
});
//(id  => educational_organizationId  ,training_program_id => trainingProgramId)
router.get("/:id/show_certificates/:certificate_id",async(req,res) =>{
    educational_organization.findById(req.params.id, function(err, co) {
        if(!err){
            const cer = co.certificates.find(m=>m._id==req.params.certificate_id);
            res.send(cer);      
        }
          else{
            res.status(404).send('Not found');   
          }
    });
      });
//(id  => educational_organizationId  ,certificate_id => certificateId)
router.put("/:id/update_certificate/:certificate_id",async(req,res)=>{
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
    educational_organization.findById(req.params.id, function(err, co) {
                  
        if(!err){
            
           
     //const certifacatee = co.certificates.find(m=>m._id==req.params.certificate_id);
     var certifacatee///here 
               for( const end of co.certificates){
               if(end !==null){
                console.log(end._id)
                console.log(req.params.certificate_id)
                if(end._id==req.params.certificate_id){
                    certifacatee=end
                    //console.log(end)
                }
               }
            }
     if(certifacatee!==undefined){
        co.certificates.remove(certifacatee)
    if(req.body.name!=null){
        certifacatee.name=req.body.name;
    }
    if(req.body.type!=null){
        certifacatee.type=req.body.type;
    }
    if(req.body.available!=null){
        certifacatee.accreditation=req.body.accreditation;
    }
  
     }
     console.log(certifacatee);
   co.certificates.push(certifacatee)
    //educatorr.save();
 
    
const x = educational_organization.findOneAndUpdate({"_id":req.params.id},co)
co.save();
const returnedvaule= educational_organization.findOne({"_id":req.params.id})
res.send("Done");

}
    
      else{
        res.status(404).send('Not found');

      }
    });


  });    
//(id  => educational_organizationId  ,certificate_id => certificateId)
router.delete("/:id/delete_certificate/:certificate_id",async(req,res) =>{
    educational_organization.findById(req.params.id, function(err, co) {                
        if(!err){     
            const cer = co.certificates.find(m=>m._id==req.params.certificate_id);
           co.certificates.remove(cer);     
            co.save();
            res.send("done");

        } 
          else{
            res.status(404).send('Not found');
          }
    });
    
    
});
//End Certificant CRUD

// Training Program CRUD
//URL to add trainings programs  (id  => educational_organizationId)
router.post("/:id/add_programs",async(req,res)=>{

    const schema={
       name:Joi.string().min(3).max(500).required(),
       trainer_id:Joi.number().integer().min(3).max(500),
       trainer_name:Joi.string().min(3).max(500),
       description:Joi.string().min(3).max(500),
       type:Joi.string().min(3).max(500).required(),
       duration:Joi.string().min(3).max(500),
       apply_due_date:Joi.string().min(3).max(500),
       start_date:Joi.string().min(3).max(500),
       required_skills:Joi.string().min(3).max(500)
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const temp_EOrg= await educational_organization.findById(req.params.id)
    if(temp_EOrg!==undefined){
        const prog= await  training_programs.create(req.body);
        temp_EOrg.training_programs.push(prog);
        temp_EOrg.save();
        res.send(prog);
        
    }else{
        res.status(404).send('Not found');
    }
    });
//(id  => educational_organizationId)
router.get("/:id/show_training_programs",async(req,res) =>{
    educational_organization.findById(req.params.id, function(err, co) {         
        if(!err){         
            res.send(co.training_programs);      
        }
          else{
            res.status(404).send('Not found');   
          }
      });
});
//(id  => educational_organizationId  ,training_program_id => trainingProgramId)
router.get("/:id/show_training_programs/:training_program_id",async(req,res) =>{
    educational_organization.findById(req.params.id, function(err, co) {
        if(!err){
            const prog = co.training_programs.find(m=>m._id==req.params.training_program_id);
            res.send(prog);      
        }
          else{
            res.status(404).send('Not found');   
          }
    });
      });
//(id  => educational_organizationId  ,programs_id => programsId)
router.put("/:id/update_programs/:programs_id",async(req,res)=>{
    const schema={
        name:Joi.string(),
        trainer_id:Joi.number().integer(),
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

    educational_organization.findById(req.params.id, function(err, co) {
                  
        if(!err){
            
            var program///here 
            for( const end of co.training_programs){
            if(end !==null){
             console.log(end._id)
             console.log(req.params.programs_id)
             if(end._id==req.params.programs_id){
                program=end
                 //console.log(end)
             }
            }
         }
    //const program = co.training_programs.find(m=>m._id==req.params.programs_id);



    if(program!==undefined){
       co.training_programs.remove(program)

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
        co.training_programs.push(program)
        //educatorr.save();
     
        
    const x = educational_organization.findOneAndUpdate({"_id":req.params.id},co)
    res.send({data: co})        
    }else{
     res.send("this training Program is not Found")   
    }
}
    else{
        res.status(404).send('Not found');

      }
    });
});
//(id  => educational_organizationId  ,training_program_id => trainingProgramId)
router.delete("/:id/delete_training_programs/:training_program_id",async(req,res) =>{
    educational_organization.findById(req.params.id, function(err, co) {            
        if(!err){   
          const prog = co.training_programs.find(m=>m._id==req.params.training_program_id);   
           co.training_programs.remove(prog); 
            co.save();
            res.send("done");
        }
        
          else{
            res.status(404).send('Not found');
    
          }
      
    
    });
});

// End Training Program CRUD
////////////////////////////////
/*  */

//Badr
//reserve workshop for course  
//is Exist in Co-working Space 
router.put('/:id/accept_reservation/:room_id',async (req,res)=>{
 
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
   
    const coWorkingSpace =await  coworking_space.findById(req.params.id);
    //const roooms = coWorkingSpace.rooms;
    const room = coWorkingSpace.rooms.find(m=>m._id===parseInt(req.params.room_id));
    if(room !==undefined){
    if(room.reserved===false){
        coWorkingSpace.rooms.remove(room)
        room.reserved_id = req.body.reserved_id;
        room.reserved=req.body.reserved;
        room.reserved_date=req.body.reserved_date;
        room.end_of_reservation=req.body.end_of_reservation;
        coWorkingSpace.rooms.push(room)
        await coworking_space.findOneAndUpdate({"_id":req.params.id},{"rooms":coWorkingSpace.rooms});
        res.send({data:coWorkingSpace.rooms});
        
    }else{

    res.send("this room is not available");
}
}else{
    res.send("There is no such room");
}
});



//accept member for course
//(id  => educational_organizationId  ,course_id => courseId,student_id=>studentId)
router.put("/:id/accept_member_course/:course_id/:student_id",async (req,res)=>{
   const EOrg =await educational_organization.findById(req.params.id);
   const course =EOrg.courses.find(m=>m._id==req.params.course_id);
   const courseModel =await courses.findById(req.params.id);
   if(course!==undefined){
    if(course.available===true){
        var cousrses=EOrg.courses

        if(course.acceptedmembers==null)
        course.acceptedmembers=[]
       
        if(courseModel.acceptedmembers==null)
        courseModel.acceptedmembers=[]

        for( var i = 0; i < cousrses.length; i++){ 
           if ( cousrses[i]._id == req.params.course_id) {
            cousrses.splice(i, 1); 
           }
        }

        course.acceptedmembers.push(req.params.student_id)
        courseModel.acceptedmembers.push(req.params.student_id)
        courseModel.save()
        cousrses.push(course)
        //  console.log(masterclasses)
           EOrg.save()
           const temp_EOrg =await educational_organization.findOneAndUpdate({"_id":req.params.id},{"courses":cousrses});

        res.send(temp_EOrg.courses)
    }else{
     res.send("this Course is not available");
    }
}else{
    res.send("There is no such Course Here");

}


});
//accept member for master class 
//(id  => educational_organizationId  ,master_class_id => masterClassId,student_id=>studentId)
router.put("/:id/accept_member_master/:master_class_id/:student_id",async(req,res)=>{

    const EOrg =await educational_organization.findById(req.params.id);
    const masterclass =EOrg.master_class.find(m=>m._id==req.params.master_class_id);
    const master_classModel =await master_class.findById(req.params.master_class_id);
    if(masterclass!==undefined){
     if(masterclass.available===true){
         var masterclasses=EOrg.master_class

         if(masterclass.students_assigened==null)
         masterclass.students_assigened=[]
        
         if(master_classModel.students_assigened==null)
         master_classModel.students_assigened=[]

         for( var i = 0; i < masterclasses.length; i++){ 
            if ( masterclasses[i]._id == req.params.master_class_id) {
                masterclasses.splice(i, 1); 
            }
         }
        masterclass.students_assigened.push(req.params.student_id)
        master_classModel.students_assigened.push(req.params.student_id)
        master_classModel.save()
        masterclasses.push(masterclass)
      //  console.log(masterclasses)
         EOrg.save()
         const temp_EOrg =await educational_organization.findOneAndUpdate({"_id":req.params.id},{"master_class":masterclasses});
         res.send(temp_EOrg.master_class)
     }else{
      res.send("this Master Class is not available");
     }
 }else{
     res.send("There is no such Master Class Here");
 
 }
 
 });





//End Badr





module.exports = router



