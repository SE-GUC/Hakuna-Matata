import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CardList from './components/CardList';

import PartnerComp from './components/partnercompnents/partner';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MemberProfile from './components/Profiles/MemberProfile';


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
          <div className="App-header">
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

                /*THIS WILL NOT WORK RIGHT AWAY 
                  PLEASE GO TO Hakuna-Matata\client\node_modules\react-cardstack\dist
                  and rename "CardStack.js" with capital "S" to "Cardstack.js" with small
                  "s", and it will work sorry for inconvinience

                  PS id you cant find path please run: npm install --save react-cardstack ok thx bye
                  */

              <PartnerComp />

                </div>
              </React.Fragment>
            )} />
            <Route exact path="/coWorkingSpace" render={props => (
              <React.Fragment>
                <div >

       {/* here will be the coWorkingSpace part */}


                </div>
              </React.Fragment>
            )} />
            <Route exact path="/consultancyAgency" render={props => (
              <React.Fragment>
                <div className="App-list">

       {/* here will be the consultancyAgency part */}


                </div>
              </React.Fragment>
            )} />
            <Footer></Footer>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
