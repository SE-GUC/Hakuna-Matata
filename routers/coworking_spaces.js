const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose')

const room = require('../models/room'); 
const coworking_space = require('../models/coworking_space'); 


const coworking_spaces = require('../arrays/coworking_spaces'); 

//(partner_id =>partnerId)
router.post("/create/:partner_id",(req,res)=>{
    const schema={
        name:Joi.string().required(),
        phone_number:Joi.string().required(),
        location:Joi.string().required(),
        business_plan:Joi.string().required(),
        facilites:Joi.string().required(),
        max_no_rooms:Joi.number().integer().required()        

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const co = new coworking_space(
        parseInt(req.params.partner_id),
        coworking_spaces.length+1,
        req.body.name,
        req.body.phone_number,
        req.body.location,
        req.body.business_plan,
        req.body.facilites,
        [],
        req.body.max_no_rooms
        
    );
    coworking_spaces.push(co);
    res.send({data:coworking_spaces});

});




//(id  => coworking_spaces)
router.delete("/:id/delete",(req,res)=>{
    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
    coworking_spaces.splice(co);
    res.send(coworking_spaces);

});
//(id  => coworking_spaces)
router.get("/:id",(req,res)=>{

    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
    res.send(co);

});

router.get("/",(req,res)=>{

    res.send(coworking_spaces);

});

//(id  => coworking_spaces)
router.put("/:id/update",(req,res)=>{
    const schema={
        name:Joi.string(),
        phone_number:Joi.string(),
        location:Joi.string(),
        business_plan:Joi.string(),
        facilites:Joi.string(),
        max_no_rooms:Joi.number().integer()        

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
 if(req.body.name!=null){
       co.name=req.body.name;
   }if(req.body.phone_number!=null){
    co.phone_number=req.body.phone_number;
}if(req.body.location!=null){
    co.location=req.body.location;
}if(req.body.business_plan!=null){
    co.business_plan=req.body.business_plan;
}if(req.body.facilites!=null){
    co.facilites=req.body.facilites;
}if(req.body.max_no_rooms!=null){
    co.max_no_rooms=req.body.max_no_rooms;
}
    res.send(co);

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
            reserved_id:req.params.reserved_id,
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

//accept reservation for co-working 
//reserve workshop for a course 
router.put('/accept_reservation/:id/:room_id',(req,res)=>{
 
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

module.exports = router
