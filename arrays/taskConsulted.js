const task = require('../models/task'); 
var moment = require('moment');
var taskConsulted = [
    new task(3,2,null,null,null,null,'desc1',[
        "Grafic designer","Android devoloper","Ios dvoloper"
    ],'2000 dollar w nos', moment().format('MMMM Do YYYY, h:mm:ss a'),null,null,null,2,1,null,null,null,null,true,[1,3]),
];
module.exports = taskConsulted;