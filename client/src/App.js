

import React, { Component } from 'react';

import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';


import GetAllTasks from './components/landingPage/pages/GetAllTasks';

import GetAllPartners from './components/landingPage/pages/GetAllPartners';

import PartnerProfile from './components/profiles/PatnerAsUser'

import GetAllmembers from './components/landingPage/pages/getAllmembers'

import MemberProfile from './components/profiles/UserViewMember'

import GetAllAgencies from './components/landingPage/pages/GetAllAgencies'

import GetAllEdu from './components/landingPage/pages/GetAllEducations'

import consultancyAgencyProfile from './components/profiles/GetSpecificAgency'

import educationalOrganizationProfile from './components/profiles/GetSpecificEdu'

import GetCourse from './components/profiles/GetCourse'

import GetSpecRoom from './components/profiles/getSpecRoom'

import GetAllCoworkingSpace from './components/landingPage/pages/GetAllCoworkingSpace'

import GetSpecCoworkingSpace from './components/profiles/getSpec'

import Start from './components/auth/Start'

import StartAs from './components/auth/StartAs'

// import HomePage from './components/search/HomePage'

import createCourse from './components/Forms/CreateCourse.js'
import createMasterClass from './components/Forms/CreateMasterClass.js'
import createTraining from './components/Forms/CreateTraining.js'
import createEducator from './components/Forms/CreateEducator.js'
import createCertificate from './components/Forms/CreateCertificate.js'
import createRoom from './components/Forms/CreateRoom.js'
import GetCertificate from './components/profiles/GetCertificate';

import GetMasterClass from './components/profiles/GetMasterClass'
import GetMyProfile from './components/profiles/GetMyProfile'
import GetSpecTask from './components/profiles/getSpecTask';
import GetAllProjects from './components/landingPage/pages/GetAllProjects'
import GetSpecProject from './components/projectTask/pages/MemberNAProject'

import updateCo from './components/Forms/updateCo'
import updateRoom from './components/Forms/updateRoom'


import updateCourse from './components/updateProfiles/updateCourse'
import updateEduOrg from './components/updateProfiles/updateEduOrg'
import updateCertificate from './components/updateProfiles/updateCertificate'
import updateMasterClass from './components/updateProfiles/updateMasterCLass';
import  GetTrainingProgram from './components/profiles/GetTrainingProgram'
import updateTrain from './components/updateProfiles/updateTrainingprogram';

import ReserveForm from './components/Forms/ReserveForm'
var store = require('store')
class App extends Component {
  




  constructor(props) {

    super(props);

    this.state = {

      token: '',

      id: '',

      tags: [],

      notClose: true,

      dataisLoaded: false

    }

    this.handleChangetoken = this.handleChangetoken.bind(this)



    //this.handleSubmit = this.handleSubmit.bind(this)

    //this.handleClickClose = this.handleClickClose.bind(this)

  }

  handleChangetoken(payload) {
    this.setState({ token: payload.token })

    this.setState({ id: payload.id })

    this.setState({ tags: payload.tags })


    this.setState({ dataisLoaded: true })
 
store.set('payload',payload)
console.log(store.get('payload').tags)

console.log(store.get('payload').id)

  }

  showData() {

    if (this.state.dataisLoaded) {

      return {

        display: 'block'

      }

    } else {

      return {

        display: 'none'

      }

    }

  }

  render() {



    return (

      <div className="App" style={{

        background: 'black'

      }}>



        <Router>
        <Route exact path="/showMyProfile" render={() => (

<GetMyProfile />

)} />


          <Route exact path="/HomePage" render={() => (

            <GetAllTasks />

          )} />

          <Route exact path="/members" render={() => (

            <GetAllmembers />

          )} />

          <Route exact path="/partners" render={() => (

            <GetAllPartners />

          )} />



          )} />

          <Route exact path="/" render={() => (

            <Start  handleChangetoken={this.handleChangetoken} />

          )} />
<Route exact path="/createCourse/:id" component={createCourse}/>
          <Route exact path="/createMasterClass/:id" component={createMasterClass}/>
          <Route exact path="/createTrainingProgram/:id" component={createTraining}/>
          <Route exact path="/createEducator/:id" component={createEducator}/>
          <Route exact path="/createCertificate/:id" component={createCertificate}/>
          <Route exact path="/createRoom/:id" component={createRoom}/>
          <Route exact path="/task/:id" render={() => (

            <memberTask></memberTask>

          )} />
          <Route exact path="/updateCoWorkingSpace/:id" component={updateCo} />
          <Route exact path="/updateRoom/:roomId" component={updateRoom} />
          <Route exact path="/startAS" render={() => (

            <StartAs tags={store.get('payload').tags} />

          )} />

          <Route exact path="/partner/:id" component={PartnerProfile} />

          <Route exact path="/member/:id" component={MemberProfile} />

          <Route exact path="/task/:id" component={GetSpecTask} />

          <Route exact path="/consultancyAgencies/:id" component={consultancyAgencyProfile} />

          <Route exact path="/educationalOrganization/:id" component={educationalOrganizationProfile} />

          <Route exact path='/educationalOrganizations/course/:id/:courseId' component={GetCourse} />

          <Route exact path='/educationalOrganizations/masterClass/:id/:masterClassId' component={GetMasterClass} />



          <Route exact path='/educationalOraganizations/certificate/:id/:certificateId' component={GetCertificate} />

          <Route exact path='/projects/:id' component={GetSpecProject} />


          <Route exact path='/coWorkingSpaces/:id/showRooms/:roomId' component={GetSpecRoom} />

          <Route exact path='/coWorkingSpaces/:id' component={GetSpecCoworkingSpace} />

          <Route exact path="/consultancyAgencies" component={GetAllAgencies} />

          <Route exact path="/educationalOrganizations" component={GetAllEdu} />

          <Route exact path="/coWorkingSpaces" component={GetAllCoworkingSpace} />



          <Route exact path="/projects" component={GetAllProjects} />

          <Route exact path="/projects" component={GetAllProjects} />

          <Route exact path="/coWorkingSpaces/:id/showRooms/:roomId/reserve" component={ReserveForm} />

          <Route exact path="/educationalOraganizations/trainingProgram/:id/:trainingProgramId" component={GetTrainingProgram} />
          <Route exact path="/updateEduOrg/:id" component={updateEduOrg} />
          <Route exact path="/updateCourse/:id/:courseId" component={updateCourse} />  
          <Route exact path="/updateCertificate/:id/:certificateId" component={updateCertificate} /> 
          <Route exact path="/updateMasterClass/:id/:masterClassId" component={updateMasterClass} />
          <Route exact path="/updateTrain/:id/:trainingProgramId" component={updateTrain} />





        </Router>

      </div>

    );

  }

}



export default App;