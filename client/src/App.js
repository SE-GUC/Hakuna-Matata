import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';



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

        <Route exact path="/user/partner" component={PartnerAsUser} />
        <Route exact path="/admin/partner" component={AdminAsUser} />
       


      </Router>
    );
  }
}

export default App;
