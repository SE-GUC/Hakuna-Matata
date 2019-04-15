import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import adminAtomic from './components/projectTask/pages/adminAtomic';
import memberatomic from './components/projectTask/pages/memberatomic';
import partnerAtomic from './components/projectTask/pages/partnerAtomic';
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
import GetCertificate from './components/profiles/GetCertificate';
import GetMasterClass from './components/profiles/GetMasterClass'
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
      
      <Route exact path="/HomePage" render={() => (
            <GetAllTasks  />
          )} />
                <Route exact path="/members" render={() => (
            <GetAllmembers  />
          )} />
                <Route exact path="/partners" render={() => (
            <GetAllPartners  />
          )} />      
               
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
          <Route exact path="/partner/:id" component={PartnerProfile} />
          <Route exact path="/member/:id" component={MemberProfile} />
          <Route exact path="/consultancyAgency/:id" component={consultancyAgencyProfile} />
          <Route exact path="/educationalOrganization/:id" component={educationalOrganizationProfile} />
          <Route exact path='/educationalOrganizations/course/:id/:courseId' component={GetCourse}/>
          <Route exact path='/educationalOrganizations/masterClass/:id/:masterClassId' component={GetMasterClass}/>
          
          <Route exact path='/educationalOraganizations/certificate/:id/:certificateId' component={GetCertificate}/>
         
          <Route exact path='/coWorkingSpaces/:id/showRooms/:roomId' component={GetSpecRoom}/>
          <Route exact path='/coWorkingSpaces/:id' component={GetSpecCoworkingSpace}/> 
          <Route exact path="/consultancyAgencies" component={GetAllAgencies} />
          <Route exact path="/educationalOrganizations" component={GetAllEdu} />
          <Route exact path="/coWorkingSpaces" component={GetAllCoworkingSpace} />
          
      </Router>
      </div>
    );
  }
}

export default App;
