const express = require('express');
const app = express();
app.use(express.json());
const task = require('./routers/task.js'); 
const coworking_spaces =require('./routers/coworking_spaces');
const consultancy_agency =require('./routers/consultancy_agencys');
const educational_organization =require('./routers/educational_organizations');
const courses = require('./routers/courses.js');
const courserequests = require('./routers/courserequests.js');
const notification = require('./routers/notifications.js');

const member =require('./routers/member');
const partner =require('./routers/partner');
const platform= require('./routers/platform');

app.get('/', (req, res) => {
    res.send(`
    <h1><b>7zalqom <i>yrqod</i> hona </b></h1>
    <a href="/task">tasks</a>
    <a href="/member">members</a>
    <a href="/partner">Partners</a>
    <a href="/platform">Platform</a> 
    <a href="/consultancy_agency">Consultancy Agencys</a>
    <a href="/educational_organization">Educational Organizations</a>
    <a href="/coworking_space">Co-working Spaces</a> 
    `);
})



app.use('/Notification', notification);
app.use('/courses', courses);
app.use('/courserequests', courserequests);
app.use('/task',task);
app.use('/coworking_space', coworking_spaces);
app.use('/educational_organization',educational_organization);
app.use('/member',member);
app.use('/partner',partner);
app.use('/consultancy_agency',consultancy_agency);
app.use('/platform',platform);
app.listen(3000,()=>console.log("Now there is a server running on port 3000 "));