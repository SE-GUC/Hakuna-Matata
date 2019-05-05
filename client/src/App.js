<<<<<<< HEAD


import React, { Component } from 'react';

import './App.css';

import { BrowserRouter as Router, Route,  } from 'react-router-dom';



//  import Start from './components/Au/Start'
import StartAs from './components/Au/StartAs'
import HomePage from './components/landingPage/HomePage';
import HomeNavbar from './components/layout/HomeNavbar'
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
import UpdateMember from './components/Forms/UpdateMember'
import UpdatePartner from './components/Forms/UpdatePartner'
// import updateCourse from './components/actions/updateCourse'
import updateMasterCLass from './components/actions/updateMasterCLass'
import updateTrainingProgram from './components/actions/traingingPrograme'
import TrainingProgramProfile from './components/actions/TrainingProgramProfile'
import TaskProfile from './testComponents/TaskProfile'
import History from './components/Forms/History'
import updateCo from './components/Forms/updateCo'
import Chatbot from './components/chat/ChatWindow'

import updateTask from './testComponents/TaskUpdate'
import updateProject from './testComponents/ProjectUpdate'
import TestCourse from './testComponents/CourseForm'
import CourseProfile from './testComponents/CourseProfile'
import MasterClassProfile from './testComponents/MasterClassProfile'



import createRoom from './components/Forms/CreateRoom.js'
// import updateCourse from './components/Forms/upd'
import updateRoom from './components/Forms/updateRoom'
import RoomProfile from './components/actions/RoomProfile'

// import Test from './testComponents/ProjectForm';
import WelcomPage from './components/welcomePage/welcomPage';
// import Login from './components/Au/Login';
import Imageupload from './components/Forms/uploadimg';
import VerificationPage from './components/Forms/verification'
import ProjectProfile from './testComponents/ProjectProfile';
import Register from './components/Au/Register';
import { connect } from 'react-redux'
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
    //store.set('payload',payload)


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
    let getNavbar= this.props.auth.isAuthenticated &&this.props.auth.user.emailVerified? <HomeNavbar /> : <div></div>
    return (

        <Router>

          <div className="App"  >
          <div style={{backgroundColor:  "#2e2e2e", minHeight: '100vh', backgroundSize:'cover'}}>
           { getNavbar}
           <Route exact path="/" component={WelcomPage} />
           <Route exact path="/startAs" component={StartAs} />
       
          <Route exact path="/verificationpage"   component={VerificationPage}/>
          <Route exact path="/uploadimg"component={Imageupload}/>
          <Route exact path="/register2" component={Register} />
          {/* <Route exact path="/test" component={TestCourse} /> */}
        
          <Route exact path="/homePage" render={() => (<HomePage />)} />
            <Route exact path="/users/:id" component={MemberProfile} />
            <Route exact path='/history' component={History}></Route>
            <Route exact path='/tasks' component={Tasks}></Route>
            <Route exact path='/projects' component={Projects}></Route>
            <Route exact path='/projects/:id' component={ProjectProfile} />
            <Route exact path='/updateTask/:id' component={updateTask}></Route>
            <Route exact path='/updateProject/:id' component={updateProject}></Route>
            <Route exact path="/createRoom/:id" component={createRoom} />
            <Route exact path="/updateTrainingProgram/:id" component={updateTrainingProgram} />
            <Route exact path="/updateCourse/:id" component={updateMasterCLass} />
            <Route exact path="/updateMasterCLass/:id" component={updateMasterCLass} />
            <Route exact path="/coWorkingSpaces/rooms/:id/:roomId" component={RoomProfile} />
            <Route exact path="/updateRoom/:roomId" component={updateRoom} />
            <Route exact path='/courses' component={Courses}></Route>
            <Route exact path='/masterClasses' component={MasterClasses}></Route>
            <Route exact path='/trainingPrograms' component={TrainingPrograms}></Route>
            <Route exact path='/members' component={Members}></Route>
            <Route exact path='/partners' component={Partners}></Route>
            <Route exact path='/consultancyAgencies' component={ConsultancyAgencies}></Route>
            <Route exact path='/educationOrganizations' component={EducationOrganizations}></Route>
            <Route exact path='/coworkingSpaces' component={CoworkingSpaces}></Route>

            <Route exact path="/tasks/:id" component={TaskProfile} />
            <Route exact path="/updateCo/:id" component={updateCo} />
            <Route exact path='/TrainingProgramProfile/:id' component={TrainingProgramProfile} />
            <Route exact path='/courses/:id' component={CourseProfile} />
            <Route exact path='/masterClasses/:id' component={MasterClassProfile} />
            {/* <Route exact path='/masterClasses/:masterClassId' component={GetMasterClass} /> */}
            <Route exact path="/updatedmember/:id" component={UpdateMember} />
            <Route exact path="/updatedpartner/:id" component={UpdatePartner} />
        
            <Route exact path="/chatbot" component={Chatbot} />

            </div>

          </div>
        </Router>

    );

  }

}

const mapStateToProps =(state)=>({
  auth:state.auth
})

export default connect(mapStateToProps,{})(App);

=======
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import adminAtomic from './components/projectTask/pages/adminAtomic';
import memberatomic from './components/projectTask/pages/memberatomic';
import partnerAtomic from './components/projectTask/pages/partnerAtomic';
import GetAllTasks from './components/landingPage/pages/GetAllTasks';
import GetAllPartners from './components/landingPage/pages/GetAllPartners';
import PartnerProfile from './components/profiles/PatnerAsUser'
import NavBar from './components/common/NavBar';
import memberTask from './components/projectTask/pages/memberTask' 
import Start from './components/auth/Start'
import StartAs from './components/auth/StartAs'
// import HomePage from './components/search/HomePage'

import Member from './components/profiles/Member'
import UserViewMember from './components/profiles/UserViewMember';
import AdminViewMember from './components/profiles/AdminViewMember';
import PartnerAsPartner from './components/profiles/PartnerAsPartner'
import PartnerAsUser from './components/profiles/PatnerAsUser';
import AdminAsUser from './components/profiles/PartnerAsAdmin';
import AdminNAProject from './components/projectTask/pages/AdminNAProject';
import PartnerNAProject from './components/projectTask/pages/PartnerNAProject';
import MemberNAProject from './components/projectTask/pages/MemberNAProject';
import createTask from './components/forms/CreateTask.js'
import createConsultance from "./components/forms/CreateConsultance";
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id:'',
      tags:[],
      notClose: true,
      dataisLoaded:false
    }
    this.handleChangetoken = this.handleChangetoken.bind(this)

    //this.handleSubmit = this.handleSubmit.bind(this)
    //this.handleClickClose = this.handleClickClose.bind(this)
  }
  handleChangetoken(payload) {
    this.setState({ token:payload.token  })
    this.setState({ id :payload.id  })
    this.setState({ tags:payload.tags  })
  
    this.setState({ dataisLoaded:true  })

  }
  showData(){
    if(this.state.dataisLoaded){
      return{
        display:'block'
      }
    }else{
      return{
        display:'none'
      }
    }
  }
  render() {
    return (
      <div className="App" style={{
        background:'black'
      }}>
  
      <Router>
      <NavBar style={this.showData()}></NavBar>
      <Route exact path="/HomePage" render={() => (
            <GetAllTasks  />
          )} />
                <Route exact path="/members" render={() => (
            <getAllmembers  />
          )} />
                <Route exact path="/partner" render={() => (
            <GetAllPartners  />
          )} />      
          
          <Route exact path="/" render={() => (
            <Start id={this.state.id} handleChangetoken={this.handleChangetoken} />
          )} />
            <Route exact path="/task/:id" render={() => (
           <memberTask></memberTask>
          )} />
                    <Route exact path="/startAS" render={() => (
            <StartAs id={this.state.id} tags={this.state.tags}  />
          )} />
          <Route exact path="/partner/:id" render={() => (
            <PartnerProfile  />
          )} />
       
      </Router>
      </div>
    );
  }
}

export default App;
>>>>>>> master
