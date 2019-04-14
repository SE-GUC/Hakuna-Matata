import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import adminAtomic from './components/projectTask/pages/adminAtomic';
import memberatomic from './components/projectTask/pages/memberatomic';
import partnerAtomic from './components/projectTask/pages/partnerAtomic';


import Member from './components/profiles/Member'
import UserViewMember from './components/profiles/UserViewMember';
import AdminViewMember from './components/profiles/AdminViewMember';
import PartnerAsPartner from './components/profiles/PartnerAsPartner'
import PartnerAsUser from './components/profiles/PatnerAsUser';
import AdminAsUser from './components/profiles/PartnerAsAdmin'

class App extends Component {


  render() {
    return (
      <Router>
        <div  >


        </div>
        <Route exact path="/member" component={Member} />
        <Route exact path="/user/member" component={UserViewMember} />
        <Route exact path="/admin/member" component={AdminViewMember} />
        <Route exact path="/partner" component={PartnerAsPartner} />
        <Route exact path="/adminAtomic/:id" component={adminAtomic} />
            <Route exact path="/memberatomic/:id" component={memberatomic} />
            <Route exact path="/partnerAtomic/:id" component={partnerAtomic} />

        <Route exact path="/user/partner" component={PartnerAsUser} />
        <Route exact path="/admin/partner" component={AdminAsUser} />
       


      </Router>
    );
  }
}

export default App;
