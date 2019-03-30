const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

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
const admin= require('./routers/admin');

app.get('/', (req, res) => {
    res.send(`
    <h1><b>7zalqom <i>yrqod</i> hona </b></h1>
    <ul>
   <li> <a href="/task">tasks</a> </li>
   <li> <a href="/member">members</a> </li>
   <li> <a href="/partner">Partners</a> </li>
   <li> <a href="/platform">Platform</a> </li>
   <li> <a href="/consultancy_agency">Consultancy Agencys</a> </li>
   <li> <a href="/educational_organization">Educational Organizations</a> </li>
   <li> <a href="/coworking_space">Co-working Spaces</a> </li>
   <li> <a href="/admin">Admin</a> </li>
    </ul>
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
app.use('/admin',admin);

app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server on ${port}`))
