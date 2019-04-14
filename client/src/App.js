import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';



import Member from './components/profiles/Member'
import UserViewMember from './components/profiles/UserViewMember';

class App extends Component {


  render() {
    return (
      <Router>
        <div  >


        </div>
        <Route exact path="/member" component={Member} />
        <Route exact path="/user/member" component={UserViewMember} />
       


      </Router>
    );
  }
}

export default App;
