// Dependencies
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');


// Models
const Course = require('../models/courses');


var courses = [
    new Course(1,"Design",1,"educator_name","description","places",16,"cash",[],3,"vf","vr","Design",true,[{member_id:1,dateofapply:moment().format('MMMM Do YYYY, h:mm:ss a')},{member_id:2,dateofapply:moment().format('MMMM Do YYYY, h:mm:ss a')}]),
    new Course(2,"IOS",1,"educator_name","description","places",16,"cash",[],3,"vf","vr","Mobile development",true,[{member_id:5,dateofapply:moment().format('MMMM Do YYYY, h:mm:ss a')}])
];

module.exports=courses;
