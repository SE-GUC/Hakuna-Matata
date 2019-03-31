const express = require('express')
const router = express.Router()
//const platform= require('../arrays/platform.js');


router.get('/', (req, res) => {
    var platformTasks=[]
    for(var tid of platform){
        var taskdata=tasks.find(taskdata =>taskdata.id===tid)
        if(taskdata!==undefined)
        platformTasks.push(taskdata)
   // res.send(platform)
    }
    res.send(platformTasks)
})
module.exports = router