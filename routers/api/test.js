const express = require('express')
const router = express.Router();
const Joi = require('joi');


const User = require('../../models/User.js');
const  Skill  = require('../../models/Skill.js');
const Task = require('../../models/Task')
//get all members
router.get('/', async (req, res) => {
    const task =await Task.findById("5cb1fc2c5a9bb207a83411c9")
   console.log(task.requiredSkills)
   var members=null
   if(task.requiredSkills.length==0)
    members = await User.find({ _id: '5cb8ca93cfc5130f03090cca'  })
    else
     members = await User.find({ _id: '5cb8ca93cfc5130f03090cca' ,skills:{$all:task.requiredSkills} })

    res.json(members )
  })
  module.exports = router