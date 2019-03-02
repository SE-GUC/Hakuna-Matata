const express = require('express');
const router = express.Router();
const Joi = require('joi');

const task = require('../models/task.js'); 

const taskConsulted = require('../arrays/taskConsulted.js'); 
const tasks= require('../arrays/tasks.js');
const platform= require('../arrays/platform.js');
const members= require('../arrays/members.js');
const {Send_Task_Notification} = require("../arrays/Notifications.js");