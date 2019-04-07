import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CardList from './components/CardList';

import PartnerComp from './components/partnercompnents/partner';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MemberProfile from './components/Profiles/MemberProfile';
import GetAll from './components/pages/getAll'
import GetSpec from './components/pages/getSpec'
import GetSpecRoom from './components/pages/getSpecRoom'
import GetAllAgencies from "./components/pages/GetAllAgencies";
import GetSpecificAgency from "./components/pages/GetSpecificAgency";
import GetAllTasks from "./components/pages/GetAllTasks";
import GetAllMc from './components/pages/GetAllMc'
import GetAllTrain from './components/pages/GetAllTrain'
import GetSpecificTrain from './components/pages/GetSpecificTrain'
import GetAllEdu from './components/pages/GetAllEdu'
import GetSpecificEdu from './components/pages/GetSpecificEdu'
class App extends Component {
  // creatTable() {
  //   let buttons = []
  //   for (let i = 0; i < this.state.users.length; i++) {
  //     if (i % 2 == 0) {
  //       buttons.push( <Card user={this.state.users[i]} type='female' />)
  //     } else {
  //       buttons.push(<Card user={this.state.users[i]} type='male' />)
  //     }


  //   }
  //   return buttons
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <div className="App-header" >
            {/*this Route will be the main route of the App (Home Page of All)*/}
            <Route exact path="/" render={props => (
              <React.Fragment>
                <div className="App-list">
                  <h1 style={{
                    color: 'black',
                    textAlign: 'center',
                  }}> Welcome in Hakuna-Matata Site</h1>
                </div>
              </React.Fragment>
            )} />

            <Route exact path="/member" render={props => (
              <React.Fragment>
                <CardList />
              </React.Fragment>
            )} />
            <Route exact path="/member/:handle" component={MemberProfile} key={32}
            />

            <Route exact path="/partner" render={props => (
              <React.Fragment>
                <div >

             {   /*THIS WILL NOT WORK RIGHT AWAY 
                  PLEASE GO TO Hakuna-Matata\client\node_modules\react-cardstack\dist
                  and rename "CardStack.js" with capital "S" to "Cardstack.js" with small
                  "s", and it will work sorry for inconvinience

                  PS id you cant find path please run: npm install --save react-cardstack ok thx bye
                  */}

              <PartnerComp />

                </div>
              </React.Fragment>
            )} />
            <Route exact path="/coWorkingSpaces" component={GetAll}/>
            <Route exact path='/coWorkingSpaces/:id' component={GetSpec}/>
            <Route exact path='/coWorkingSpaces/:id/showRooms/:roomId' component={GetSpecRoom}/>

            <Route exact path="/consultancyAgencies/" component={GetAllAgencies} />
            <Route path="/consultancyAgencies/:id" component={GetSpecificAgency} />
            <Route exact path="/tasks/" component={GetAllTasks} />
     
            <Route exact path="/consultancyAgency" render={props => (
              <React.Fragment>
                <div className="App-list">

       {/* here will be the consultancyAgency part */}


                </div>
              </React.Fragment>
            )} />
            <Route exact path ="/educationalOrganizations/" component ={GetAllEdu}></Route>
      <Route exact path ="/educationalOrganizations/:id" component ={GetSpecificEdu}></Route>
      <Route exact path ="/educationalOrganizations/trainingProgram/:id/" component ={GetAllTrain}></Route>
      <Route exact path ="/educationalOrganizations/trainingProgram/:id/:programId" component ={GetSpecificTrain}></Route>
      <Route exact path ="/educationalOrganizations/masterClass/:id/" component ={GetAllMc}></Route>
      
            <Footer></Footer>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
