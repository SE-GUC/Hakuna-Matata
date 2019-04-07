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

const tasks = require('./routers/tasks.js'); 
const coWorkingSpaces =require('./routers/coWorkingSpaces');
const consultancyAgencies =require('./routers/consultancyAgencies');
const educationalOrganizations =require('./routers/educationalOrganizations');
const courses = require('./routers/courses.js');
const courseRequests = require('./routers/courseRequests.js');
const notifications = require('./routers/notifications.js');
const members =require('./routers/members');
const partners =require('./routers/partners');
const admins= require('./routers/admins');
const rooms= require('./routers/rooms');

app.get('/', (req, res) => {
    res.send(`
    <h1><b>7zalqom <i>yrqod</i> hona </b></h1>
    <ul>
   <li> <a href="/tasks">tasks</a> </li>
   <li> <a href="/members">members</a> </li>
   <li> <a href="/partners">Partners</a> </li>
   <li> <a href="/courses">courses</a> </li>
   <li> <a href="/consultancyAgencies">Consultancy Agencys</a> </li>
   <li> <a href="/educationalOrganizations">Educational Organizations</a> </li>
   <li> <a href="/coWorkingSpaces">Co-working Spaces</a> </li>
   <li> <a href="/admins">Admin</a> </li>
    </ul>
    `);
})



app.use('/notifications', notifications);
app.use('/courses', courses);
app.use('/courseRequests', courseRequests);
app.use('/tasks',tasks);
app.use('/coWorkingSpaces', coWorkingSpaces);
app.use('/educationalOrganizations',educationalOrganizations);
app.use('/members',members);
app.use('/partners',partners);
app.use('/consultancyAgencies',consultancyAgencies);
app.use('/admins',admins);
app.use('/rooms',rooms);

app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Server on ${port}`))
