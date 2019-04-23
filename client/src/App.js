

import React, { Component } from 'react';

import './App.css';

import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom';



import Start from './components/auth/Start'
import StartAs from './components/auth/StartAs'
import HomePage from './components/landingPage/HomePage';
import HomeNavbar from './components/common/HomeNavbar'
import MemberProfile from './components/profile/MemberProfile'
// import MemberProfile from './components/profile/MemberProfile'
import Tasks from './components/showAll/showAllTask'
import Projects from './components/showAll/showAllProject'
import Courses from './components/showAll/showAllCourse'
import MasterClasses from './components/showAll/showAllMasterClass'
import TrainingPrograms from './components/showAll/showAllTrainingProgram'
import Members from './components/showAll/showAllMember'
import CoworkingSpaces from './components/showAll/showAllCoworkingSpace'
import ConsultancyAgencies from './components/showAll/showAllConsultancyAgency'
import EducationOrganizations from './components/showAll/showAllEducationalOrganization'
import Partners from './components/showAll/showAllPartner'
import GetCourse from './components/abdo/CourseProfile'
import GetSpecRoom from './components/abdo/RoomProfile'
import GetMasterClass from './components/abdo/MasterClassProfile'
import GetSpecProject from './components/abdo/ProjectProfile'
import getTrainingProgram from './components/abdo/TrainingProgramProfile'
import task from './components/abdo/TaskProfile'
import History from './components/Forms/History'
import ConsultancyForm from './components/Forms/ConsultancyForm';
import EducationOrganizationForm from './components/Forms/EducationOrganizationForm';
import CoworkingSpaceForm from './components/Forms/CoworkingSpaceForm';
// import Chat from './components/chat/ChatWindow'
// import GetAllPartners from './components/landingPage/pages/GetAllPartners';
// import PartnerProfile from './components/profiles/PatnerAsUser'
// import GetAllmembers from './components/landingPage/pages/getAllmembers'
// import MemberProfile from './components/profiles/UserViewMember'
// import GetAllAgencies from './components/landingPage/pages/GetAllAgencies'
// import GetAllEdu from './components/landingPage/pages/GetAllEducations'
// import consultancyAgencyProfile from './components/profiles/GetSpecificAgency'
// import educationalOrganizationProfile from './components/profiles/GetSpecificEdu'
// import GetCourse from './components/profiles/GetCourse'
// import GetSpecRoom from './components/profiles/getSpecRoom'
// import GetAllCoworkingSpace from './components/landingPage/pages/GetAllCoworkingSpace'
// import GetSpecCoworkingSpace from './components/profiles/getSpec'
// import HomePage from './components/search/HomePage'
// import GetAllTasks from './components/landingPage/pages/GetAllTasks';
// import createCourse from './components/Forms/CreateCourse.js'
// import createMasterClass from './components/Forms/CreateMasterClass.js'
// import createTraining from './components/Forms/CreateTraining.js'
// import createEducator from './components/Forms/CreateEducator.js'
// import createCertificate from './components/Forms/CreateCertificate.js'
// import createRoom from './components/Forms/CreateRoom.js'
// import GetCertificate from './components/profiles/GetCertificate';
// import GetMasterClass from './components/profiles/GetMasterClass'
// import GetMyProfile from './components/profiles/GetMyProfile'
// import GetSpecTask from './components/profiles/getSpecTask';
// import GetAllProjects from './components/landingPage/pages/GetAllProjects'
// import GetSpecProject from './components/projectTask/pages/MemberNAProject'
// import updateCo from './components/Forms/updateCo'
// import updateRoom from './components/Forms/updateRoom'
var store = require('store')
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      token: '',

      id: '',

      tags: [],

      notClose: true,
      dataisLoaded: false,
      logged: false,

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
    this.setState({ logged: true })
    store.set('payload',payload)


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
  getNavbar() {

    if (this.state.logged) {
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
      <Router>

      <div className="App" >


            <HomeNavbar style={{
              display:this.getNavbar()
            }}/>
                <Route exact path="/" render={() => ( <Start  handleChangetoken={this.handleChangetoken} />)} />

          <Route exact path="/HomePage" render={() => (<HomePage />)} />
          <Route exact path="/MemberProfile/:id" component={MemberProfile} />
          <Route exact path='/History' component={History}></Route>
          <Route exact path='/allTasks' component={Tasks}></Route>
          <Route exact path='/allProjects' component={Projects}></Route>
          {/* <Route exact path='/allConsultedTasks' component={ConsultedTasks}></Route>
          <Route exact path='/allConsultedProjects' component={ConsultedProjects}></Route> */}
          <Route exact path='/allCourses' component={Courses}></Route>
          <Route exact path='/allMasterClasses' component={MasterClasses}></Route>
          <Route exact path='/allTrainingPrograms' component={TrainingPrograms}></Route>
          <Route exact path='/allMembers' component={Members}></Route>
          <Route exact path='/allPartners' component={Partners}></Route>
          <Route exact path='/allConsultancyAgencies' component={ConsultancyAgencies}></Route>
          <Route exact path='/allEducationOrganizations' component={EducationOrganizations}></Route>
          <Route exact path='/allCoworkingSpaces' component={CoworkingSpaces}></Route>
          <Route exact path='/coWorkingSpaces/room/:id/:roomId' component={GetSpecRoom} />
          <Route exact path="/educationalOrganizations/trainingProgram/:id/:trainingProgramId" component={getTrainingProgram} />
          <Route exact path="/tasks/:id" component={task} />
          <Route exact path='/projects/:id' component={GetSpecProject} />
          <Route exact path='/educationalOrganizations/course/:id/:courseId' component={GetCourse} />
          <Route exact path='/educationalOrganizations/masterClass/:id/:masterClassId' component={GetMasterClass} />
          {/* <Route exact path="/showMyProfile" render={() => ( <GetMyProfile /> )} /> */}
          {/* <Route exact path="/try" render={() => (  )} /> */}
          {/* <Route exact path="/members" render={() => ( <GetAllmembers />)} /> */}
          {/* <Route exact path="/partners" render={() => (<GetAllPartners />)} />
          <Route exact path="/createCourse/:id" component={createCourse}/>
          <Route exact path="/createMasterClass/:id" component={createMasterClass}/>
          <Route exact path="/createTrainingProgram/:id" component={createTraining}/>
          <Route exact path="/createEducator/:id" component={createEducator}/>
          <Route exact path="/createCertificate/:id" component={createCertificate}/>
          <Route exact path="/createRoom/:id" component={createRoom}/>
          <Route exact path="/task/:id" render={() => (<memberTask/>)} />
          <Route exact path="/updateCoWorkingSpace/:id" component={updateCo} />
          <Route exact path="/updateRoom/:roomId" component={updateRoom} />
          <Route exact path="/startAS" render={() => (<StartAs tags={store.get('payload').tags} />)} />
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
          <Route exact path="/projects" component={GetAllProjects} />
          <Route exact path="/projects" component={GetAllProjects} /> */}
          {/* <Route exact path="/coWorkingSpaces" component={GetAllCoworkingSpace} id={store.get('payload').id} tags={store.get('payload').tags} /> */}
       

      </div>
      </Router>
    );

  }

}



export default App;