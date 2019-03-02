const express = require('express');
const router = express.Router();
const Joi = require('joi');


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

router.post("/add_room/:id",(req,res)=>{
    
    const schema={
        capacity:Joi.number().integer().required()       

    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
if(co.max_no_rooms>co.rooms.length){
    const rooom = new room(null,co.rooms.length+1,null,req.body.capacity,null,false);
co.rooms.push(rooom);
    res.send(co);
return;
}
res.send("YOU CANT ADD ROOM");

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

//(id  => coworking_spaces)
router.get('/:id/show_rooms',(req,res)=>{
    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
  
    res.send(co.rooms);
});

//(id  => coworking_spaces, room_id=>roomId)
router.get('/:id/show_room/:room_id',(req,res)=>{
    
    
    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
  const romm = co.rooms.find(m=>m.id===parseInt(req.params.room_id));
    res.send(romm);
});

//(id  => coworking_spaces, room_id=>roomId)
router.delete('/:id/delete_room/:room_id',(req,res)=>{
    const co =coworking_spaces.find(m=>m.id===parseInt(req.params.id));    
    const romm = co.rooms.find(m=>m.id===parseInt(req.params.room_id));
     co.rooms.splice(romm);
     res.send(co);

});

//(id  => coworking_spaces, room_id=>roomId)
router.put('/:id/update_room/:room_id',(req,res)=>{
 
    const schema={
        capacity:Joi.number().integer(),
        reserved:Joi.boolean(),
        reserved_date:Joi.string(),
        end_of_reservation:Joi.string(),
        reserved_id:Joi.number().integer()
    };
    const result =Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
   
    const co = coworking_spaces.find(m=>m.id===parseInt(req.params.id));
    const roooms = co.rooms;
    const room = roooms.find(m=>m.id===parseInt(req.params.room_id));
    if(req.body.capacity!=null)  {  
    room.capacity = req.body.capacity;}
    if(req.body.reserved!=null)       { 
    room.reserved=req.body.reserved;}
    if(req.body.capacity!=null)      {  
    room.reserved_date=req.body.reserved_date;}
    if(req.body.capacity!=null)        {
    room.end_of_reservation=req.body.end_of_reservation;}
    if(req.body.reserved_id!=null)        {
        room.reserved_id=req.body.reserved_id;}
        
        res.send(room);
        
})

module.exports = router