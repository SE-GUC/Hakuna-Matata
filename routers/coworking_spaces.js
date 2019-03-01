const express = require('express');
const router = express.Router();
const room = require('../models/rooms'); 
const coworking_space = require('../models/coworking_space'); 
const Joi = require('joi');
const coworking_spaces = require('../models/coworking_space1'); 

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

module.exports = router