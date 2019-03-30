const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')

const room = require('../models/room'); 
const coworking_space = require('../models/coworking_space'); 


//(partner_id =>partnerId)
router.post("/create/:partner_id",async (req,res)=>{
  
    try {
        const schema={
            name:Joi.string().required(),
            phone_number:Joi.string().required(),
            location:Joi.string().required(),
            business_plans:Joi.string().required(),
            facilites:Joi.string().required(),
            
            max_no_rooms:Joi.number().integer().required()        
            
        };
        const result =Joi.validate(req.body,schema);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }


        const co = new coworking_space ({
            partner_id:req.params.partner_id,
            name:req.body.name,
            
            phone_number:req.body.phone_number,
            location:req.body.location,
            business_plans:req.body.business_plans,
            facilites:req.body.facilites,
            rooms:[],
            max_no_rooms:req.body.max_no_rooms
        });
        
        co.save();
        res.send(coworking_space);
        
        
    }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       } 
   
});




//(id  => coworking_spaces)
router.delete("/:id/delete",async (req,res)=>{

    try {
        const id = req.params.id
        const co = await coworking_space.findByIdAndRemove(id)
        
        res.json({msg:'CoworkingSpace was deleted successfully', data: co})
       }
       catch(error) {
           // We will be handling the error later
           console.log(error)
       }  
});
//(id  => coworking_spaces)
router.get("/:id",async (req,res)=>{
    const co = await coworking_space.findById(req.params.id)
    res.send(co);

});

router.get("/",async (req,res)=>{
    const cos = await coworking_space.find()
   res.send(cos);
});

//(id  => coworking_spaces)
router.put("/:id/update",async (req,res)=>{
    const id = req.params.id
    const schema={
        partner_id:Joi.string(),
        name:Joi.string(),
        phone_number:Joi.string(),
        location:Joi.string(),
        business_plans:Joi.string(),
        facilites:Joi.string(),
        rooms:Joi.array(),
                max_no_rooms:Joi.number().integer()        

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;}
        coworking_space.findById(req.params.id, function(err, co) {
            if(!err){
                
                if(req.body.name!=null){
                 co.name=req.body.name
                }if(req.body.partner_id!=null){
                    co.partner_id=req.body.partner_id
             }if(req.body.phone_number!=null){
                co.phone_number=req.body.phone_number
             
             }if(req.body.location!=null){
             
              co.location=req.body.location
            }if(req.body.business_plans!=null){
                co.business_plans=req.body.business_plans
              
             }if(req.body.facilites!=null){
                co.facilites=req.body.facilites
               
             }if(req.body.rooms!=null){
                co.business_plans=req.body.rooms
               
             }if(req.body.max_no_rooms!=null){
                co.business_plans=req.body.max_no_rooms
               
             }
             const result=co.save()
             res.send(co); 
    
              }
              else{
                res.status(404).send('Not found');
    
              }  
             });
    
});

// create room
router.post("/add_room/:id",(req,res)=>{
    
    const schema={
        reserved_id:Joi.string(),
        capacity:Joi.number().integer().required(),
        reserved_date:Joi.date(),
        end_of_reservation:Joi.date(),
        reserved:Joi.boolean()     

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

coworking_space.findById(req.params.id, function(err, co) {
          
        if(!err){
            
            if(co.max_no_rooms>co.rooms.length){
           const rooom =  new room ({
            reserved_id:req.body.reserved_id,
            capacity:req.body.capacity,
            reserved_date:req.body.reserved_date,
            end_of_reservation:req.body.end_of_reservation,
            reserved:req.body.reserved
            
            
        });
        room.create(rooom);
        co.rooms.push(rooom);
            res.send(co);
            co.save();
        return;
        }
        res.send("YOU CANT ADD ROOM");
        
          }
          else{
            res.status(404).send('Not found');

          }
      });
});
router.post("/add_room",async(req,res)=>{
    try {
        const schema={
            reserved_id:Joi.string(),
            capacity:Joi.number().integer().required(),
            reserved_date:Joi.date(),
            end_of_reservation:Joi.date(),
            reserved:Joi.boolean()     
    
        };
        const result =Joi.validate(req.body,schema);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }
    const ro = await room.create(req.body) 
     res.send({msg: "Room is created ",data: ro});  
    }   catch(error) {
        // We will be handling the error later
        console.log(error)
    }    

});



//accept reservation for co-working 
//reserve workshop for a course 
router.put('/accept_reservation/:id/:room_id',async (req,res)=>{
 
    const schema={
        reserved:Joi.boolean(),
        reserved_date:Joi.date(),
        end_of_reservation:Joi.date(),
        reserved_id: Joi.string()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
   
    const co =await  coworking_space.findById(req.params.id);
    const roooms = co.rooms;
    const rooom = roooms.find(m=>m._id==req.params.room_id);
    if(rooom.reserved===false){
        rooom.reserved_id = req.body.reserved_id;
        rooom.reserved=req.body.reserved;
        rooom.reserved_date=req.body.reserved_date;
        rooom.end_of_reservation=req.body.end_of_reservation;
        await coworking_space.findOneAndUpdate({"_id":req.params.id},{"rooms":co.rooms});
        await room.findOneAndUpdate({'_id':req.params.room_id},{
            reserved_id:req.body.reserved_id,
            reserved:req.body.reserved,
            reserved_date:req.body.reserved_date,
            end_of_reservation:req.body.end_of_reservation
        })
        res.send({data:co.rooms});
        return;
    };

    res.send("this room is not available");
})


//(id  => coworking_spaces) // show all rooms
router.get('/:id/show_rooms',(req,res)=>{
  
    coworking_space.findById(req.params.id, function(err, co) {
              
        if(!err){
            
           
            res.send(co.rooms);
        
        }
        
     
          else{
            res.status(404).send('Not found');
    
          }
      });
    
    });

// show all rooms of the collection 
       router.get("/show_rooms/collection",async (req,res)=>{
  
        const cos = await room.find()
        res.send(cos);
        
        });

//(id  => coworking_spaces, room_id=>roomId) // show specific room
router.get('/:id/show_room/:room_id',(req,res)=>{
    
    coworking_space.findById(req.params.id, function(err, co) {
              
        if(!err){
            
           
            const ro = co.rooms.find(m=>m._id==req.params.room_id);
            res.send(ro);
           
        }
        
     
          else{
            res.status(404).send('Not found');
    
          }
      });
    
    });
    
    router.get('/show_room/:id',(req,res)=>{
    
        room.findById(req.params.id, function(err, ro) {
                  
            if(!err){
                
               
                res.send(ro);
               
            }
            
         
              else{
                res.status(404).send('Not found');
        
              }
          });
        
        });
        
        
//(id  => coworking_spaces, room_id=>roomId) // delete room
router.delete('/:id/delete_room/:room_id',(req,res)=>{
    coworking_space.findById(req.params.id, function(err, co) {
          
        if(!err){
            
           
            const ro = co.rooms.find(m=>m._id==req.params.room_id);
            co.rooms.remove(ro)
            co.save();
            res.send(co);
           
        }
        
     
          else{
            res.status(404).send('Not found');
    
          }
      });

});

router.delete("/delete_room/:id",async(req,res) =>{
    try{
    const id=req.params.id;
    

    //console.log({data :allCourses})

    const ro= await room.findOneAndRemove({"_id": id})
    var roo=await room.find()
        //deletedformCourses.save()
    res.send({data :roo})
}
catch(error)
  {
      console.log(error)
  }
    
});

//(id  => coworking_spaces, room_id=>roomId) // update room
router.put('/:id/update_room/:room_id',async (req,res)=>{
 
    const schema={
        capacity:Joi.number().integer(),
        reserved:Joi.boolean(),
        reserved_date:Joi.string(),
        end_of_reservation:Joi.string(),
        reserved_id:Joi.string()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    coworking_space.findById(req.params.id, async function(err, co) {
          
        if(!err){
            
           
            const ro = co.rooms.find(m=>m._id==req.params.room_id);
            if(req.body.capacity!=null)  {  
                ro.capacity = req.body.capacity;}
                if(req.body.reserved!=null)       { 
                ro.reserved=req.body.reserved;}
                if(req.body.reserved_date!=null)      {  
                ro.reserved_date=req.body.reserved_date;}
                if(req.body.end_of_reservation!=null)        {
                ro.end_of_reservation=req.body.end_of_reservation;}
                if(req.body.reserved_id!=null)        {
                    ro.reserved_id=req.body.reserved_id;}
            await room.findOneAndUpdate({'_id':req.params.room_id},{"capacity":ro.capacity,"reserved":ro.reserved,"reserved_date":ro.reserved_date,"end_of_reservation":ro.end_of_reservation,"reserved_id":ro.reserved_id})
           await coworking_space.findOneAndUpdate({'_id':req.params.id},{"rooms":co.rooms});
            res.send(co);

        }
        
     
          else{
            res.status(404).send('Not found');
    
          }
      });
})
router.put("/update_room/:id",async (req,res)=>{
    try{
      const id=req.params.id
      const schema={
        capacity:Joi.number().integer(),
        reserved:Joi.boolean(),
        reserved_date:Joi.string(),
        end_of_reservation:Joi.string(),
        reserved_id:Joi.string()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
          const ro=await room.findOneAndUpdate({"_id":id},req.body)
          const roo=await room.findOne({"_id":id})
          const cos=await coworking_space.find()
          for(const co of cos){
              const rooo = co.rooms.find(rooo => rooo._id ==id)
              if(rooo!==undefined){
                  co.rooms.remove(rooo)
                  co.rooms.push(roo)
                  console.log(co.rooms)
                  co.save()
              }
          }
      res.send({data: roo,msg: "Before",data:ro });
      }catch(error) {
          // We will be handling the error later
          console.log(error)
      }  
  });
module.exports = router
