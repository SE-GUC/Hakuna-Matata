// Dependencies
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');
const mongoose=require('mongoose')

// Models
const Course = require('../models/courses');


var courses = [
   new Course({name:"Mayar",
   educator_name:"educator",
   description:"desc",
   places:3,
   available_places:2,
   payment:54,
   course_duration:55,
   start_date:2019-02-02,
   end_date:2019-02-02,
   categories:"cat",
   available:true,
   listofapplies:[],
   acceptedmembers:[]
})

]

module.exports=courses;
