// Dependencies
const express = require('express');
const router = express.Router();
var moment = require('moment');
const Joi = require('joi');

// Models
const Courserequest = require('../models/Courserequest');

//temporary data created as if it was pulled out of the database ...

var courserequests = [ new Courserequest(1,"programming online course", moment().format('MMMM Do YYYY, h:mm:ss a')
,1,"front end",[{recomendationid:1,expert_id:2,course_id:1,rating:0 ,numberofratings:0}])];




module.exports=courserequests;
