const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

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
app.use(passport.initialize())

// // Passport configuration
require('./config/passport')(passport)

const tasks = require('./routers/api/tasks.js'); 
const coWorkingSpaces =require('./routers/api/coWorkingSpaces');
const consultancyAgencies =require('./routers/api/consultancyAgencies');
const educationalOrganizations =require('./routers/api/educationalOrganizations');
const courses = require('./routers/api/courses.js');
const courseRequests = require('./routers/api/courseRequests.js');
const notifications = require('./routers/api/notifications.js');
const members =require('./routers/api/members');
const partners =require('./routers/api/partners');
const users =require('./routers/api/users');
const admins= require('./routers/api/admins');
const rooms= require('./routers/api/rooms');
const projects=require('./routers/api/projects');
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
   <li> <a href="/users">users</a> </li>
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
app.use('/users',users);
app.use('/partners',partners);
app.use('/consultancyAgencies',consultancyAgencies);
app.use('/admins',admins);
app.use('/rooms',rooms);
app.use('/projects',projects)
app.use((req,res) => res.status(404).send(`<h1>Can not find what you're looking for</h1>`))

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Server on ${port}`))
