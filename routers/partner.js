const express = require('express')
const router = express.Router()

// We will be connecting using database 
const partner = require('../models/partner')
const notObject = require("../arrays/Notifications.js");
const projects=require('../arrays/projects')
// temporary data created as if it was pulled out of the database ...
const  partners = require('../arrays/partners')

const {notificationSummaries} = require("../arrays/Notifications.js");

//show my project (id =>partnerId)
router.get('/:id/show_projects',(req,res)=>{
    projects.forEach(element => {
        if(element.partner_id===parseInt(req.params.partner_id)){
            res.write(JSON.stringify(element));
        }
    });
    res.end();
});

// Get all partner
router.get('/adminpartner', (req, res) => {
    res.send(partners)
})


// Get a certain partner (id =>partnerId)
router.get('/:id/adminpartner', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})



// Delete Certine partner from Array (id =>partnerId)
router.delete('/:id/deletepartner/adminpartner', (req, res) => {
    const partnerId = req.params.id
    //router.listen( () => console.log(partnerId))
    const partner = partners.find(partner=> partner.id === partnerId)
    partners.splice(partners.indexOf(partner),1)
})



router.get('/:id/show_accpted_task_notify',(request,response)=>{
    const not = notificationSummaries.find(not=> not.sent_to === parseInt(request.params.id)&&not.title==="Your task has been accepted");
   
    response.send(not);
});
router.get('/:id/show_assigned_task_notify',(request,response)=>{
    const not = notificationSummaries.find(not=> not.sent_to === parseInt(request.params.id)&&not.title==="You task has been assigned to a member!");
   
    response.send(not);
});


// Get all partner
router.get('/', (req, res) => {
    res.send(partners)
})


// Get a certain partner (id =>partnerId)
router.get('/:id', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})



// Delete Certine partner from Array (id =>partnerId)
router.delete('/:id/deletepartner', (req, res) => {
    const partnerId = req.params.id
    //router.listen( () => console.log(partnerId))
    const partner = partners.find(partner=> partner.id === partnerId)
    partners.splice(partners.indexOf(partner),1)
})


// Get all partner
router.get('/', (req, res) => {
    res.send(partners)
})

/*marina show profile */
// Get a certain partner (id =>partnerId)
router.get('/:id', (req, res) => {
    const partnerId = req.params.id
    const partner = partners.find(partner=> partner.id === partnerId)
    if(partner!==undefined)
        res.send(partner)
})


router.post('/:id/editrequest',(request,response)=>{
    var id=request.params.id;
    var e= notObject.SendToAdminRequestNotification("Partner "+id+" wants to edit his profile");
    response.sendStatus(200);
});
module.exports=router;