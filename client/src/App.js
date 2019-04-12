import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CardList from './components/CardList';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
// x

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header></Header>
          <div className="App-header" >
            {/*this Route will be the main route of the App (Home Page of All)*/}
            <Route exact path="/" style={{
                    background:'black'
                  }} 
              render={props => (
              <React.Fragment>
                <div className="App-list">
                  <h1 style={{
                    color: 'black',
                    textAlign: 'center',
                  }}> Welcome in Hakuna-Matata Site</h1>
                </div>
              </React.Fragment>
            )} />

            <Route exact path="/member" component={CardList}/>
        {   // <Route exact path="/member/:handle" component={MemberProfile} key={32}/>
}


         <Footer></Footer>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;